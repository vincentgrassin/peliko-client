import { BASE_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getRefreshedTokens = async (token: string) => {
  const response = await fetch(`${BASE_URL}/refresh_token/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `refreshToken=${token}`,
  });
  const responseJson = await response.json();
  return responseJson;
};

export const getRefreshToken = async () => {
  const token = await AsyncStorage.getItem("@refreshToken");
  if (token !== null) {
    const tokens = await getRefreshedTokens(token);
    return tokens;
  }
  return false;
};
