import { gql } from '@apollo/client';

// User Queries

// User Mutations

export const USER_LOGIN = gql`
  mutation UserLogin($username: String!, $password: String!) {
    userLogin(user: { username: $username, password: $password }) {
      success
      message
      user {
        _id
        username
        role
      }
      accessToken
      expiresIn
    }
  }
`;

export const ACCESS_TOKEN = gql`
  mutation newAccessToken {
    getUserAccessToken {
      success
      message
      accessToken
    }
  }
`;
