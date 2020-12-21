/**
 * APOLLO typeDefs
 *
 * Defines gql schema for queries
 */

import { gql } from 'apollo-server-express';

const userSchema = require('./user');
const memberSchema = require('./member');

const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const schemaArray = [root, userSchema, memberSchema];

export default schemaArray;
