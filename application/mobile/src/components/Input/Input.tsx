import React from "react";
import {
  Input as ReactNativeInput,
  InputProps as ReactNativeInputProps
} from "react-native-elements";

export interface InputProps extends ReactNativeInputProps {}

const Input: React.FC<InputProps> = ({ ...props }) => (
  <ReactNativeInput {...props} />
);

export default Input;
