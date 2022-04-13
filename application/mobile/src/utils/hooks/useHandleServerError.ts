import * as React from "react";
import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenList } from "../../navigation/NavigationContainer";
import { resources } from "../../themeHelpers";
import { ErrorCode } from "../types/types";
import { client } from "./useApolloClient";
import { useNavigation } from "./useNavigation";

export const useHandleServerError = () => {
  const { navigate } = useNavigation();
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const handleLogOut = async () => {
    await AsyncStorage.setItem("@accessToken", "");
    await AsyncStorage.setItem("@refreshToken", "");
    client.cache.reset();
    navigate<ScreenList>("Login");
  };

  const handleError = (error: ApolloError) => {
    const code: ErrorCode = error?.graphQLErrors[0]?.extensions?.code;
    if (code === "UNAUTHENTICATED") {
      handleLogOut();
    }
  };

  const updateErrorMessage = (errors: readonly GraphQLError[]) => {
    setErrorMessage(errors[0]?.message || resources.genericError);
  };

  const resetErrorMessage = () => {
    setErrorMessage("");
  };
  return {
    handleLogOut,
    handleError,
    updateErrorMessage,
    errorMessage,
    resetErrorMessage,
    setErrorMessage,
  };
};
