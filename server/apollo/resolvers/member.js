/**
 * APOLLO resolvers
 * nmember.js
 * Defines queries
 * Points to datasources
 */

import { AuthenticationError } from 'apollo-server-errors';

const resolvers = {
  Query: {
    getAllMembers: (parent, args, context, info) => {
      const { getAllMembers } = context.dataSources.memberData;
      return getAllMembers(context);
    },
  },

  Mutation: {
    addMember: (parent, args, context, info) => {
      if (!context.currentuser)
        throw new AuthenticationError('You must be logged in to do this.');
      const { addMember } = context.dataSources.memberData;
      return addMember(args, context);
    },
  },
};

export default resolvers;
