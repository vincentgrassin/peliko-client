import * as React from "react";
import {
  Avatar as ReactNativeAvatar,
  AvatarProps as ReactNativeAvatarProps,
  makeStyles
} from "react-native-elements";

import { palette } from "../../themeHelpers";
import Badge from "../Badge";
import Text from "../Text";
import { getDefaultAvatarUri } from "../../utils/helpers/colorHelper";
import View from "../View";

interface AvatarProps extends ReactNativeAvatarProps {
  notification?: number;
  index?: number;
  name?: string;
}

const useStyles = makeStyles(() => ({
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
  },
  name: {
    width: 60,
    textAlign: "center"
  }
}));

const Avatar: React.FC<AvatarProps> = ({
  notification,
  index = 0,
  source,
  name,
  ...props
}) => {
  const styles = useStyles();

  return (
    <View>
      <ReactNativeAvatar
        rounded
        source={source || { uri: getDefaultAvatarUri(index) }}
        {...props}
      />
      {(notification || notification === 0) && (
        <Badge
          containerStyle={styles.notification}
          badgeStyle={styles.badge}
          value={notification}
        />
      )}
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

export default Avatar;
