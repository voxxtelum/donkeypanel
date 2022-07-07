import { gql } from '@apollo/client';

export const GET_MEMBERS = gql`
  query getAllMembers {
    getAllMembers {
      success
      message
      members {
        _id
        username
        class
        isMain
        role
        active
        guildRank
        main {
          _id
          username
          class
        }
      }
    }
  }
`;

export const UPDATE_MEMBER = gql`
  subscription memberUpdated {
    memberUpdated {
      success
      message
      member {
        _id
        username
        class
        isMain
        role
        active
        guildRank
        main {
          _id
          username
          class
        }
      }
    }
  }
`;

export const MEMBERS_SUBSCRIPTION = gql`
  subscription memberAdded {
    memberAdded {
      _id
      username
      class
      isMain
      role
      active
      guildRank
      main {
        _id
        username
        class
      }
    }
  }
`;
