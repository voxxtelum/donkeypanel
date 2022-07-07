// apollo hooks
import { useMutation, ApolloClient, gql } from '@apollo/client';
import { cache } from '../utils/cache';
import { client } from '../api/apollo';

// gql queries, mutations
import { USER_LOGIN } from '../api/user';

// const CURRENT_USER = gql`
//   mutation CurrentUser($username: String, $id: String, $role: String) {
//     user(username: $username, _id: $id, role: $role) {
//       _id
//       username
//       role
//     }
//   }
// `;

export async function loginUser(dispatch, loginPayload) {
  // login mutation

  dispatch({ type: 'REQUEST_LOGIN' });
  console.log(`===== loginPayload = ${loginPayload.username}`);
  return await client
    .mutate({
      mutation: USER_LOGIN,
      variables: {
        username: loginPayload.username,
        password: loginPayload.password,
      },
    })
    .then(({ data }) => {
      const { success, user, message, accessToken } = data.userLogin;
      console.log(message);
      if (success === false) {
        dispatch({
          type: 'LOGIN_ERROR',
          error: message,
        });
        return user;
      } else {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: user,
            token: accessToken,
          },
        });
        localStorage.setItem('ACCESS_TOKEN', accessToken);
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log(`====== user ${user.username}`);
        return user;
      }
    })
    .catch((error) => console.log(`===== .mutate.catch ${error}`));
}

export async function logoutUser(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('ACCESS_TOKEN');
  localStorage.removeItem('currentUser');
  client.resetStore();
}
