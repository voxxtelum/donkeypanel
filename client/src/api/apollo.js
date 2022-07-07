/* eslint-disable no-loop-func */
// apollo
import {
  ApolloClient,
  createHttpLink,
  fromPromise,
  from,
  split,
} from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from '@apollo/client/utilities';
import { cache } from '../utils/cache';
import { ACCESS_TOKEN } from './user';

// TODO break URI out to env
export const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

export const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: { reconnect: true },
});

export const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

export const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  if (!token) {
    return {
      headers: {
        ...headers,
      },
    };
  } else {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  }
});

export const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    let isRefreshing = false;
    let pendingRequests = [];

    const resolvePendingRequests = () => {
      pendingRequests.map((callback) => callback());
      pendingRequests = [];
    };
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          // TODO change to TOKEN_EXPIRED_ERROR
          case 'UNAUTHENTICATED':
            let _forward;
            console.log(`case: UNAUTHENTICATED ${err.extensions.message}`);

            if (!isRefreshing) {
              // localStorage.removeItem('ACCESS_TOKEN');
              // console.log(`token removed from storage`);
              isRefreshing = true;
              _forward = fromPromise(
                client
                  .mutate({
                    mutation: ACCESS_TOKEN,
                    fetchPolicy: 'no-cache',
                  })
                  .then(({ data: { getUserAccessToken } }) => {
                    // setAccessToken(accessToken);
                    // console.log(`== data: getUserAccessToken == `);
                    // console.log(getUserAccessToken);
                    localStorage.setItem(
                      'ACCESS_TOKEN',
                      getUserAccessToken.accessToken
                    );
                    // const oldHeaders = operation.getContext().headers;
                    // operation.setContext({
                    //   headers: {
                    //     ...oldHeaders,
                    //     authorization: `Bearer ${accessToken}`,
                    //   },
                    // });
                    return true;
                  })
                  .then(() => {
                    resolvePendingRequests();
                    return true;
                  })
                  .catch(() => {
                    pendingRequests = [];
                    return false;
                  })
                  .finally(() => {
                    isRefreshing = false;
                  })
              );
            } else {
              _forward = fromPromise(
                new Promise((resolve) => {
                  pendingRequests.push(() => resolve());
                })
              );
            }

            return _forward.flatMap(() => forward(operation));
          default:
            console.log(
              `GQL ERR: ${err.message} - ${err.path} - ${JSON.stringify(
                err.locations
              )}`
            );
        }
      }
    }
    if (networkError) console.log(`NETWORK ERROR: ${networkError}`);
  }
);

export const client = new ApolloClient({
  link: from([errorLink, authLink, splitLink]),
  cache,
});
