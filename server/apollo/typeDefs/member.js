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
    main: Member
    alts: [Member]
    team: [String]
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
    main: String
    alts: [String]
    team: [String]
    guildRank: Int
  }

  input MemberUpdateInput {
    username: String
    class: String
    spec: String
    role: String
    isMain: Boolean
    main: String
    alts: [String]
    team: [String]
    guildRank: Int
  }

  type GetAllMembersResponse {
    success: Boolean
    message: String!
    members: [Member]
  }

  input GetFilteredMembersInput {
    username: String
    class: [String]
    spec: String
    role: String
    isMain: Boolean
    main: String
    team: String
    guildRank: Int
    active: Boolean
  }

  type GetFilteredMembersResponse {
    success: Boolean
    message: String!
    members: [Member]
  }

  type MemberAddResponse {
    success: Boolean!
    message: String!
    member: Member
  }

  type MemberUpdateResponse {
    success: Boolean!
    message: String!
    member: Member
  }

  extend type Query {
    getAllMembers: GetAllMembersResponse!
    getFilteredMembers(
      filter: GetFilteredMembersInput!
    ): GetFilteredMembersResponse!
  }

  extend type Mutation {
    addMember(member: MemberAddInput!): MemberAddResponse!
    updateMember(
      member: MemberUpdateInput!
      id: String
      username: String
    ): MemberUpdateResponse!
  }

  extend type Subscription {
    memberAdded: Member!
    memberUpdated: MemberUpdateResponse!
  }
`;

module.exports = member;
