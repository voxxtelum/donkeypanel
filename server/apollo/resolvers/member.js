/**
 * APOLLO resolvers
 * nmember.js
 * Defines queries
 * Points to datasources
 */

import { AuthenticationError } from 'apollo-server-errors';
import pubsub from '../utils/pubsub';

const resolvers = {
  Query: {
    getAllMembers: (parent, args, context, info) => {
      const { getAllMembers } = context.dataSources.memberData;
      return getAllMembers(context);
    },
    getFilteredMembers: (parent, args, context, info) => {
      const { getFilteredMembers } = context.dataSources.memberData;
      return getFilteredMembers(args, context);
    },
  },

  Mutation: {
    addMember: (parent, args, context, info) => {
      // if (!context.currentuser)
      //   throw new AuthenticationError('You must be logged in to do this.');
      const { addMember } = context.dataSources.memberData;
      return addMember(args, context);
    },
    updateMember: (parent, args, context, info) => {
      const { updateMember } = context.dataSources.memberData;
      return updateMember(args, context);
    },
  },

  Subscription: {
    memberAdded: {
      subscribe: () => pubsub.asyncIterator(['memberAdded']),
    },
    memberUpdated: {
      subscribe: () => pubsub.asyncIterator(['memberUpdated']),
    },
  },
};

export default resolvers;
