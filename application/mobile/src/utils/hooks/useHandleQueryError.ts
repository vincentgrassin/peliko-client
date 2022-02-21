import { ApolloError } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ScreenList } from "../../navigation/NavigationContainer";
import { ErrorCode } from "../types/types";
import { client } from "./useApolloClient";
import { useNavigation } from "./useNavigation";

export const useHandleQueryError = () => {
  const { navigate } = useNavigation();

  const handleLogOut = async () => {
    await AsyncStorage.setItem("@accessToken", "");
    await AsyncStorage.setItem("@refreshToken", "");
    client.cache.reset();
    navigate<ScreenList>("Login");
  };

  const handleError = async (error: ApolloError) => {
    const code: ErrorCode = error?.graphQLErrors[0]?.extensions?.code;
    if (code === "UNAUTHENTICATED") {
      handleLogOut();
    }
  };

  return { handleLogOut, handleError };
};
