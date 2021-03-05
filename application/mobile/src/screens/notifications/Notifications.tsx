import React from "react";
import { View, Text } from "react-native";

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = ({ ...props }) => (
  <View>
    <Text>Notifications</Text>
  </View>
);

export default Notifications;
