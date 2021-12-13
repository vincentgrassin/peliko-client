import * as React from "react";
import {
  Icon as ReactNativeIcon,
  IconProps as ReactNativeIconProps
} from "react-native-elements";

interface IconProps extends ReactNativeIconProps {}

const Icon: React.FC<IconProps> = ({ ...props }) => (
  <ReactNativeIcon {...props} />
);

export default Icon;
