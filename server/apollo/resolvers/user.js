/**
 * APOLLO resolvers
 * user.js
 * Defines queries
 * Points to datasources
 */

// dataSources: () => ({
//     userData: new dataSources.UserDataSource(models.UserModel),
// }),

const resolvers = {
  Query: {
    me: (parent, args, context, info) => {
      const { me } = context.dataSources.userData;
      return me(context);
    },

    getAllUsers: (parent, args, context, info) => {
      const { getAllUsers } = context.dataSources.userData;
      return getAllUsers(context);
    },
  },

  Mutation: {
    getUserAccessToken: (parent, args, context, info) => {
      const { getUserAccessToken } = context.dataSources.userData;
      return getUserAccessToken(context);
    },
    userSignup: (parent, args, context, info) => {
      const { userSignup } = context.dataSources.userData;
      return userSignup(args, context);
    },
    userLogin: (parent, args, context, info) => {
      const { userLogin } = context.dataSources.userData;
      return userLogin(args, context);
    },
  },
};

export default resolvers;
