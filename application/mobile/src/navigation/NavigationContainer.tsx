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

export const screenList = {
  stackNavigator: {
    Login: "Login",
    BottomNavigation: "BottomNavigation",
    RollScreen: "RollScreen",
    CamScreen: "CamScreen",
    PicturesGallery: "PicturesGallery"
  },
  bottomNavigator: {
    Notifications: "Notifications",
    RollCreationForm: "RollCreationForm",
    Home: "Home"
  }
};

export default function MainNavigationContainer() {
  const Stack = createStackNavigator();
  const { stackNavigator, bottomNavigator } = screenList;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={stackNavigator.Login}
        headerMode="none"
      >
        <Stack.Screen name={stackNavigator.Login} component={Login} />
        <Stack.Screen
          name={stackNavigator.BottomNavigation}
          component={BottomNavigation}
        />
        <Stack.Screen name={stackNavigator.RollScreen} component={RollScreen} />
        <Stack.Screen name={stackNavigator.CamScreen} component={CamScreen} />
        <Stack.Screen
          name={stackNavigator.PicturesGallery}
          component={PicturesGallery}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
