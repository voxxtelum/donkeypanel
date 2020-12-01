/**
 * APOLLO typeDefs
 *
 * Defines gql schema for queries
 */

import { gql } from 'apollo-server-express';

const userSchema = require('./user');

const root = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const schemaArray = [root, userSchema];

export default schemaArray;
