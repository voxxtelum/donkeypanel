/**
 * APOLLO Datasource
 * user.js
 *
 * Defines API for Mongo
 */

import { MongoDataSource } from 'apollo-datasource-mongodb';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import { jwt } from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-errors';
import _ from 'lodash';
import { createTokens, refreshCookieOptions } from './utils';

export default class UserDataSource extends MongoDataSource {
  initialize(config) {
    super.initialize(config);

    this.me = this.me.bind(this);
    this.userSignup = this.userSignup.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  async me({ currentUser }) {
    console.log(currentUser.id);
    return await this.model.findOne({ _id: currentUser.id });
  }

  async userSignup({ user: { username, password, role } }, context) {
    let userExists;
    userExists = await this.model
      .findOne({ username: username })
      .collation({ locale: 'en', strength: 1 });

    if (userExists) throw new UserInputError(`${username} already exists`);

    const usernameCap = _.capitalize(username);

    //const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // gen original iss, used for validating/revoking refreshtokens
    const iss = uuidv4();

    const saveUser = async (user) => {
      try {
        return await this.model.create(user);
      } catch (err) {
        throw new Error(err);
      }
    };

    const createdUser = await saveUser({
      username: usernameCap,
      password: hashedPassword,
      role: role ? role : 'basic',
      iss,
    });

    const success = createdUser ? !!createdUser.id : false;

    console.log(`User created success: ${success}`);

    if (success) {
      return {
        success: success,
        message: success
          ? `User was added`
          : `There was an error creating the user`,
        user: createdUser,
      };
    }
  }

  async userLogin({ user: { username, password } }, { res }) {
    console.log(`userLogin - ${username} - ${password}`);
    const ACCESS_KEY = 'NEEDTOMAKESECRET';
    const REFRESH_KEY = 'KEYSBUTIAMLAZY';
    try {
      let userExists;

      try {
        userExists = await this.model
          .findOne({ username: username })
          .collation({ locale: 'en', strength: 1 });
      } catch (err) {
        throw new Error(`Error finding ${username}`);
      }

      if (!userExists || !userExists.id)
        throw new UserInputError(`${username} not found`);

      let isPasswordValid;
      try {
        isPasswordValid = await bcrypt.compare(password, userExists.password);
      } catch (err) {
        throw new Error(`Error comparing passwords`);
      }

      if (!isPasswordValid) throw new UserInputError(`Incorrect password`);

      const { accessToken, expiresIn } = createTokens(userExists, res);

      return {
        success: true,
        message: `Login successful`,
        user: userExists,
        accessToken,
        expiresIn,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message || `Login error occurred`,
        user: null,
        accessToken: null,
        expiresIn: null,
      };
    }
  }

  async getAllUsers(parent, args, context, info) {
    let foundDocs;
    try {
      foundDocs = await this.model
        .find()
        .collation({ locale: 'en', strength: 1 })
        .sort({ username: 1 })
        .exec();
    } catch (error) {
      throw error;
    }
    const success = foundDocs && foundDocs.length ? !!foundDocs[0].id : false;

    return {
      success: success,
      message: success ? `${foundDocs.length} users found.` : `No users found.`,
      users: foundDocs,
    };
  }
}
