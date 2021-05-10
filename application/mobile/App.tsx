import React from "react";
import { Provider as GraphQlProvider } from "urql";
import { client } from "./src/utils/helpers/client";
import { NavigationProvider } from "./src/navigation/NavigationContext";
import MainNavigationContainer from "./src/navigation/NavigationContainer";

export default function App() {
  return (
    <GraphQlProvider value={client}>
      <NavigationProvider>
        <MainNavigationContainer />
      </NavigationProvider>
    </GraphQlProvider>
  );
}
