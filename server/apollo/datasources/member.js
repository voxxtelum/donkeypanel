/**
 * APOLLO Datasource
 * member.js
 *
 * Defines API for Mongo
 */

import { MongoDataSource } from 'apollo-datasource-mongodb';
import { UserInputError, AuthenticationError } from 'apollo-server-errors';
import _ from 'lodash';

export default class MemberDataSource extends MongoDataSource {
  initialize(config) {
    super.initialize(config);

    this.getAllMembers = this.getAllMembers.bind(this);

    this.addMember = this.addMember.bind(this);
  }

  async addMember({ member }, { currentUser }) {
    let memberExists;
    memberExists = await this.model
      .findOne({ username: member.username })
      .collation({ locale: 'en', strength: 1 });

    if (memberExists)
      throw new UserInputError(`${member.username} already exists.`);

    const memberNameCap = _.capitalize(member.username);

    const saveMember = async (member) => {
      try {
        return await this.model.create(member);
      } catch (error) {
        throw new Error(error);
      }
    };

    const addedMember = await saveMember({
      ...member,
      username: memberNameCap,
    });

    const success = addedMember ? !!addedMember.id : false;

    if (success) {
      return {
        success: success,
        message: success
          ? `${memberNameCap} was added.`
          : `There was an error adding the member.`,
        member: addedMember,
      };
    }
  }

  async getAllMembers(context) {
    if (!context.req) throw new Error(`No request found`);

    let foundMembers;
    try {
      foundMembers = await this.model
        .find()
        .collation({ locale: 'en', strength: 1 })
        .sort({ username: 1 })
        .exec();
    } catch (error) {
      throw new Error(error);
    }

    const success =
      foundMembers && foundMembers.length ? !!foundMembers[0].id : false;

    return {
      success: success,
      message: success
        ? `${foundMembers.length} members found`
        : `No members found`,
      members: foundMembers,
    };
  }
}
