/**
 * APOLLO typeDefs
 *
 * user.js
 */
import { gql } from 'apollo-server-express';

const user = gql`
  type User {
    _id: ID!
    username: String!
    password: String
    role: String
    createdAt: String
    updatedAt: String
    iss: String
  }

  input UserLogInUserInput {
    username: String!
    password: String!
  }

  input UserSignUpUserInput {
    username: String!
    password: String!
    role: String
  }

  type UserLogInResponse {
    success: Boolean!
    message: String!
    user: User
    accessToken: String
    expiresIn: String
  }

  type UserSignUpResponse {
    success: Boolean!
    message: String!
    user: User
  }

  type GetAllUsersResponse {
    success: Boolean
    message: String
    users: [User]
  }

  extend type Query {
    me: User
    userLogin(user: UserLogInUserInput!): UserLogInResponse!
    getAllUsers: GetAllUsersResponse!
  }

  extend type Mutation {
    userSignup(user: UserSignUpUserInput!): UserSignUpResponse!
  }
`;

module.exports = user;
