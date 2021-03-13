import "react-native-gesture-handler";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home";
import RollForm from "../screens/rollForm";
import Notifications from "../screens/notifications";
import { palette, iconSet } from "../themeHelpers";
import { useNavigationContext } from "../navigation/NavigationContext";
import { Icon } from "../components";

export default function BottomNavigation() {
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
        name="RollCreationForm"
        component={RollForm}
        // options={{
        //   tabBarIcon: ({ color }) => (
        //     <Icon type="entypo" name={iconSet.entypo.notification} />
        //   )
        // }}
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
