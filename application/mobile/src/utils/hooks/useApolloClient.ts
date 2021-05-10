import { useQuery, ApolloClient, InMemoryCache, gql } from "@apollo/client";
export { useQuery, gql };
export const client = new ApolloClient({
  uri: "http://192.168.43.22:4000/graphql",
  cache: new InMemoryCache()
});

import { ApolloProvider } from "@apollo/client/react";
export { ApolloProvider };
