/**
 * APOLLO typeDefs
 *
 * user.js
 */
import { gql } from 'apollo-server-express';

const user = gql`
  ## USER AUTH
  type GetAccessTokenResponse {
    success: String!
    message: String!
    user: User
    accessToken: String
    expiresIn: String
  }
  ## USER
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

    getAllUsers: GetAllUsersResponse!
  }

  extend type Mutation {
    getUserAccessToken: GetAccessTokenResponse!
    userSignup(user: UserSignUpUserInput!): UserSignUpResponse!
    userLogin(user: UserLogInUserInput!): UserLogInResponse!
  }
`;

module.exports = user;
