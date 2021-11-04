import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/login";
import RollScreen from "../screens/roll";
import CamScreen from "../screens/cam";
import BottomNavigation from "./BottomNavigation";
import PicturesGallery from "../screens/picturesGalleryScreen";
import { Picture } from "../utils/types/types";

export type ParamList = {
  RollScreen: {
    backgroundColor: string;
    rollId: number;
    isOpenRoll: boolean;
  };
  PictureGalleryScreen: {
    rollId: number;
    pictures: Picture[];
    initialScrollValue: number;
  };
};

export type ScreenList =
  | "Login"
  | "BottomNavigation"
  | "RollScreen"
  | "CamScreen"
  | "PicturesGallery"
  | "Notifications"
  | "RollCreationForm"
  | "Home";

export default function MainNavigationContainer() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="RollScreen" component={RollScreen} />
        <Stack.Screen name="CamScreen" component={CamScreen} />
        <Stack.Screen name="PicturesGallery" component={PicturesGallery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
