import React from "react";
import { client, ApolloProvider } from "./src/utils/hooks/useApolloClient";
import { NavigationProvider } from "./src/navigation/NavigationContext";
import MainNavigationContainer from "./src/navigation/NavigationContainer";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationProvider>
        <MainNavigationContainer />
      </NavigationProvider>
    </ApolloProvider>
  );
}
