import React from "react";
import {
  TouchableOpacity as ReactNativeTouchableOpacity,
  TouchableOpacityProps as ReactNativeTouchableOpacityProps
} from "react-native";

interface TouchableOpacityProps extends ReactNativeTouchableOpacityProps {}

const TouchableOpacity: React.FC<TouchableOpacityProps> = ({ ...props }) => (
  <ReactNativeTouchableOpacity {...props} />
);

export default TouchableOpacity;
