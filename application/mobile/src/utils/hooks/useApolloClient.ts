import { BASE_URL } from "@env";
import {
  useQuery,
  useMutation,
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";
export { useQuery, useMutation, gql };
export const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  cache: new InMemoryCache()
});

import { ApolloProvider } from "@apollo/client/react";
export { ApolloProvider };
