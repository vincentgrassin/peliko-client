import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/login";
import RollContainer from "../screens/rollContainer";
import CamContainer from "../screens/camContainer";
import BottomNavigation from "./BottomNavigation";

export default function MainNavigationContainer() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        <Stack.Screen name="RollContainer" component={RollContainer} />
        <Stack.Screen name="CamContainer" component={CamContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
