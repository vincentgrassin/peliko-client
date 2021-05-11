import { BASE_URL } from "@env";
import { useQuery, ApolloClient, InMemoryCache, gql } from "@apollo/client";
export { useQuery, gql };
export const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  cache: new InMemoryCache()
});

import { ApolloProvider } from "@apollo/client/react";
export { ApolloProvider };
