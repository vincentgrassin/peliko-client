import React from "react";
import {
  Input as ReactNativeInput,
  InputProps as ReactNativeInputProps
} from "react-native-elements";

export interface InputProps extends ReactNativeInputProps {
  errorText?: string;
}

const Input: React.FC<InputProps> = ({ errorText, ...props }) => {
  return <ReactNativeInput errorMessage={errorText} {...props} />;
};

export default Input;
