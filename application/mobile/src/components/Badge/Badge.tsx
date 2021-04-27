import React from "react";
import {
  Badge as ReactNativeBadge,
  BadgeProps as ReactNativeBadgeProps
} from "react-native-elements";
import StyleSheet from "../StyleSheet";
import { shape, palette } from "../../themeHelpers";

interface BadgeProps extends ReactNativeBadgeProps {}

const style = StyleSheet.create({
  badge: {
    backgroundColor: palette("white", 0.7),
    borderWidth: 0,
    paddingLeft: shape.spacing(1),
    paddingRight: shape.spacing(1),
    height: shape.spacing(3)
  }
});

const Badge: React.FC<BadgeProps> = ({ badgeStyle, ...props }) => (
  <ReactNativeBadge badgeStyle={[style.badge, badgeStyle]} {...props} />
);

export default Badge;
