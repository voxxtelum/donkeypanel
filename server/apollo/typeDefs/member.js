/**
 * APOLLO typeDefs
 *
 * member.js
 */

import { gql } from 'apollo-server-express';

const member = gql`
  type Member {
    _id: ID!
    username: String!
    class: String!
    spec: String
    role: String
    isMain: Boolean
    team: String
    guildRank: Int
    active: Boolean
    createdAt: String
    updatedAt: String
  }

  input MemberAddInput {
    username: String!
    class: String!
    spec: String
    role: String
    isMain: Boolean
    team: String
    guildRank: Int
  }

  type GetAllMembersResponse {
    success: Boolean
    message: String!
    members: [Member]
  }

  type MemberAddResponse {
    success: Boolean!
    message: String!
    member: Member
  }

  extend type Query {
    getAllMembers: GetAllMembersResponse!
  }

  extend type Mutation {
    addMember(member: MemberAddInput!): MemberAddResponse!
  }
`;

module.exports = member;
