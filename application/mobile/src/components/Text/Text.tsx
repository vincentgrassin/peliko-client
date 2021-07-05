import React from "react";
import {
  Text as ReactNativeText,
  TextProps as ReactNativeTextProps
} from "react-native-elements";

interface TextProps extends ReactNativeTextProps {}

const Text: React.FC<TextProps> = ({ ...props }) => (
  <ReactNativeText {...props} />
);

export default Text;
