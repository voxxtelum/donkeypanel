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
    userLogin: (parent, args, context, info) => {
      const { userLogin } = context.dataSources.userData;
      return userLogin(args, context);
    },
    getAllUsers: (parent, args, context, info) => {
      const { getAllUsers } = context.dataSources.userData;
      return getAllUsers(context);
    },
  },

  Mutation: {
    userSignup: (parent, args, context, info) => {
      const { userSignup } = context.dataSources.userData;
      return userSignup(args, context);
    },
  },
};

export default resolvers;
