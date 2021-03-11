import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/screens/login";
import Home from "./src/screens/home";
import Notifications from "./src/screens/notifications";
import NavigationContext from "./src/navigation/NavigationContext";
import { palette, iconSet } from "./src/themeHelpers";
import { useNavigationContext } from "./src/navigation/NavigationContext";
import { Icon } from "./src/components";

function BottomNavigation() {
  const Tab = createBottomTabNavigator();
  const { notification } = useNavigationContext();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: palette("red")
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon type="entypo" name={iconSet.entypo.notification} />
          )
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarBadge: notification,
          tabBarIcon: ({ color }) => (
            <Icon type="materialicons" name={iconSet.materialicons.roll} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();
  const updateNotificationNumber = (n: number) => setNotifications(n);
  const [notification, setNotifications] = React.useState<number>(0);

  return (
    <NavigationContext.Provider
      value={{
        notification: notification,
        updateNotificationNumber: updateNotificationNumber
      }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationContext.Provider>
  );
}
