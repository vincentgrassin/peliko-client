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
  root: {
    position: "relative"
  },
  notification: {
    position: "absolute",
    top: 0,
    right: 0
  },
  badge: {
    backgroundColor: palette("black"),
    paddingLeft: 0,
    paddingRight: 0,
    height: 20,
    width: 20,
    borderRadius: 20
  }
});

const Avatar: React.FC<AvatarProps> = ({
  notification,
  index = 0,
  source,
  ...props
}) => {
  return (
    <View style={style.root}>
      <ReactNativeAvatar
        rounded
        source={source || { uri: getDefaultAvatarUri(index) }}
        {...props}
      />
      {notification && (
        <Badge
          containerStyle={style.notification}
          badgeStyle={style.badge}
          value={notification}
        />
      )}
    </View>
  );
};

export default Avatar;
