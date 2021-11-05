import "react-native-gesture-handler";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { makeStyles } from "react-native-elements";
import Home from "../screens/home";
import RollForm from "../screens/rollForm";
import Notifications from "../screens/notifications";
import { palette, iconSet } from "../themeHelpers";
import { useNavigationContext } from "./NavigationContext";
import { Icon } from "../components";

const useStyles = makeStyles(() => ({
  create: {
    position: "absolute",
    bottom: 10,
    borderRadius: 50,
    backgroundColor: palette("yellow"),
    width: 60,
    height: 60,
    justifyContent: "center"
  },
  navigator: {
    backgroundColor: palette("blue")
  }
}));

export default function BottomNavigation() {
  const styles = useStyles();

  const Tab = createBottomTabNavigator();
  const { notification } = useNavigationContext();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: palette("black"),
        inactiveTintColor: palette("grey"),
        showLabel: false,
        tabStyle: styles.navigator
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <Icon {...iconSet.roll} color={color} />
        }}
      />
      <Tab.Screen
        name="RollCreationForm"
        component={RollForm}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              {...iconSet.plus}
              containerStyle={styles.create}
              size={20}
              color={color}
            />
          ),
          tabBarVisible: false
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarBadge: notification,
          tabBarIcon: ({ color }) => <Icon {...iconSet.bell} color={color} />
        }}
      />
    </Tab.Navigator>
  );
}
