import React from "react";
import {
  Badge as ReactNativeBadge,
  BadgeProps as ReactNativeBadgeProps
} from "react-native-elements";

interface BadgeProps extends ReactNativeBadgeProps {}

const Badge: React.FC<BadgeProps> = ({ ...props }) => (
  <ReactNativeBadge {...props} />
);

export default Badge;
