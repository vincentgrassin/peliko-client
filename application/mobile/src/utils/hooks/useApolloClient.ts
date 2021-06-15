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
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpLink = createHttpLink({
  uri: `${BASE_URL}/graphql`
});

const authLink = setContext(async (_, { headers }) => {
  const accessToken = await AsyncStorage.getItem("@accessToken");
  console.log("HEADER PROVIDED :  ", accessToken);
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
