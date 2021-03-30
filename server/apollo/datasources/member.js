/**
 * APOLLO Datasource
 * member.js
 *
 * Defines API for Mongo
 */

import { MongoDataSource } from 'apollo-datasource-mongodb';
import { UserInputError, AuthenticationError } from 'apollo-server-errors';
import _ from 'lodash';

import pubsub from '../utils/pubsub';

export default class MemberDataSource extends MongoDataSource {
  initialize(config) {
    super.initialize(config);

    this.getAllMembers = this.getAllMembers.bind(this);
    this.getFilteredMembers = this.getFilteredMembers.bind(this);

    this.addMember = this.addMember.bind(this);
    this.updateMember = this.updateMember.bind(this);
  }

  async addMember({ member }, { currentUser }) {
    let memberExists;
    memberExists = await this.model
      .findOne({ username: member.username })
      .collation({ locale: 'en', strength: 1 });

    if (memberExists)
      throw new UserInputError(`${member.username} already exists.`);

    const memberNameCap = _.capitalize(member.username);

    let mainCharacter;

    if (member.main) {
      let mainExists;
      mainExists = await this.model
        .findOne({ username: member.main })
        .collation({ locale: 'en', strength: 1 });
      mainExists ? (mainCharacter = mainExists) : '';
    }

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
      main: mainCharacter,
    });

    const success = addedMember ? !!addedMember.id : false;

    if (success) {
      pubsub.publish('memberAdded', { memberAdded: addedMember });

      return {
        success: success,
        message: success
          ? `${memberNameCap} was added.`
          : `There was an error adding the member.`,
        member: addedMember,
      };
    }
  }

  async updateMember({ member, id, username }, context) {
    let success = false;
    let message = '';
    let filter = '';
    console.log(username);

    if (!!id && !!username) {
      return {
        success: false,
        message: `You must provide a user id or username to update`,
        member: null,
      };
    } else {
      filter = !!id ? { _id: id } : { username: username };
    }

    const options = { new: true };
    let update = member;

    if (member.main) {
      let mainExists;
      mainExists = await this.model
        .findOne({ username: member.main })
        .collation({ locale: 'en', strength: 1 });
      if (!!mainExists) {
        update = { ...member, main: mainExists, isMain: false };
      } else {
        return {
          success: false,
          message: `Could not update character - ${member.main} does not exist`,
          member: null,
        };
      }
    }

    !!member.isMain ? (update = { ...member, isMain: true, main: null }) : '';

    console.log(filter);
    const updatedMember = await this.model
      .findOneAndUpdate(filter, update, options)
      .collation({ locale: 'en', strength: 1 })
      .populate({ path: 'main', model: 'Member' });

    success = updatedMember ? !!updatedMember.id : false;

    if (success) {
      const MemberUpdateMessage = {
        success: success,
        message: success
          ? `${updatedMember.username} has been updated${
              member.main
                ? updatedMember.isMain
                  ? ' and set as Main'
                  : ' and set as Alt'
                : ''
            }`
          : `There was an error updating ${updatedMember.username}`,
        member: updatedMember,
      };
      pubsub.publish('memberUpdated', { memberUpdated: MemberUpdateMessage });
      return MemberUpdateMessage;
    }
  }

  async getAllMembers(context) {
    if (!context.req) throw new Error(`No request found`);

    let foundMembers;
    try {
      foundMembers = await this.model
        .find()
        .populate({ path: 'main', model: 'Member' })
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

  async getFilteredMembers({ filter }, context) {
    if (!filter) throw new Error(`Request must contain variables.`);

    let foundMembers;
    try {
      foundMembers = await this.model
        .find({ ...filter })
        .populate({ path: 'main', model: 'Member' })
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
