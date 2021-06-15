import { BASE_URL } from "@env";
import {
  useQuery,
  useMutation,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { setContext } from "@apollo/client/link/context";
import { getAccessToken } from "../helpers/accessToken";

const httpLink = createHttpLink({
  uri: `${BASE_URL}/graphql`
});

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken();
  console.log("HEADER /////////////////// ", accessToken);
  setTimeout(() => {}, 3000);
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : ""
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "include"
});

export { useQuery, useMutation, gql };
export { ApolloProvider };
