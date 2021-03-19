import React from "react";
import {
  Button as ReactNativeButton,
  ButtonProps as ReactNativeButtonProps
} from "react-native-elements";

interface ButtonProps extends ReactNativeButtonProps {}

const Button: React.FC<ButtonProps> = ({ ...props }) => (
  <ReactNativeButton {...props} />
);

export default Button;
