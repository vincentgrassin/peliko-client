import React from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { client, ApolloProvider } from "./src/utils/hooks/useApolloClient";
import { NavigationProvider } from "./src/navigation/NavigationContext";
import MainNavigationContainer from "./src/navigation/NavigationContainer";

export default function App() {
  const [loaded] = useFonts({
    WorkSansRegular: require("./src/assets/fonts/WorkSans-Regular.ttf")
  });
  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <ApolloProvider client={client}>
      <NavigationProvider>
        <MainNavigationContainer />
      </NavigationProvider>
    </ApolloProvider>
  );
}
