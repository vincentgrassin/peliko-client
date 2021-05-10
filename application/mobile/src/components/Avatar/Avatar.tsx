import React from "react";
import {
  Avatar as ReactNativeAvatar,
  AvatarProps as ReactNativeAvatarProps
} from "react-native-elements";
import StyleSheet from "../StyleSheet";
import { palette } from "../../themeHelpers";
import Badge from "../Badge";
import View from "../View";
import { getDefaultAvatarUri } from "../../utils/helpers/colorHelper";

interface AvatarProps extends ReactNativeAvatarProps {
  notification?: number;
  index?: number;
}

const style = StyleSheet.create({
  notification: {
    position: "absolute",
    top: 0,
    right: 10
  },
  badge: {
    backgroundColor: palette("black"),
    paddingLeft: 0,
    paddingRight: 0
  }
});

const Avatar: React.FC<AvatarProps> = ({
  notification,
  index = 0,
  source,
  ...props
}) => (
  <View style={{ position: "relative" }}>
    <ReactNativeAvatar
      rounded
      source={source || { uri: getDefaultAvatarUri(index) }}
      {...props}
    />
    {notification && (
      <Badge
        status="success"
        containerStyle={style.notification}
        badgeStyle={style.badge}
        value={notification}
      />
    )}
  </View>
);

export default Avatar;
