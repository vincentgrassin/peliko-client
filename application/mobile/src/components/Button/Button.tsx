import React from "react";
import { Button as ReactNativeButton } from "react-native-elements";

interface ButtonProps {
  title: string;
  onPress: () => {};
}

const Button: React.FC<ButtonProps> = ({ ...props }) => (
  <ReactNativeButton {...props} />
);

export default Button;
