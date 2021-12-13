import * as React from "react";
import {
  Badge as ReactNativeBadge,
  BadgeProps as ReactNativeBadgeProps,
  makeStyles
} from "react-native-elements";
import { shape, palette } from "../../themeHelpers";

interface BadgeProps extends ReactNativeBadgeProps {}

const useStyles = makeStyles(() => ({
  badge: {
    backgroundColor: palette("white", 0.7),
    borderWidth: 0,
    paddingLeft: shape.spacing(1),
    paddingRight: shape.spacing(1),
    height: shape.spacing(3)
  }
}));

const Badge: React.FC<BadgeProps> = ({ badgeStyle, ...props }) => {
  const styles = useStyles();
  return (
    <ReactNativeBadge badgeStyle={[styles.badge, badgeStyle]} {...props} />
  );
};

export default Badge;
