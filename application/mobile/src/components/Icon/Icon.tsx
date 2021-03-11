import React from "react";
import { Icon as ReactNativeIcon } from "react-native-elements";

interface IconProps {
  type: string;
  name: string;
}

const Icon: React.FC<IconProps> = ({ ...props }) => (
  <ReactNativeIcon {...props} />
);

export default Icon;
