import { InMemoryCache } from '@apollo/client';

export const cache = new InMemoryCache({
  typePolicies: {
    User: {
      keyFields: ['username', '_id', 'role'],
    },
  },
});
