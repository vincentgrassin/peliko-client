import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/login";
import RollScreen from "../screens/roll";
import CamScreen from "../screens/cam";
import BottomNavigation from "./BottomNavigation";

export type ParamList = {
  RollScreen: {
    backgroundColor: string;
    rollId: number;
  };
};

export default function MainNavigationContainer() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="RollScreen" component={RollScreen} />
        <Stack.Screen name="CamScreen" component={CamScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
