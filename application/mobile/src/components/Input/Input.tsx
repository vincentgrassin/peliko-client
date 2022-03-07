import * as React from "react";
import {
  Input as ReactNativeInput,
  InputProps as ReactNativeInputProps
} from "react-native-elements";

export interface InputProps extends ReactNativeInputProps {
  errorText?: string;
}

const Input: React.FC<InputProps> = ({ errorText, value, label, ...props }) => {
  return (
    <ReactNativeInput
      accessibilityLabel={label ? label.toString() : ""}
      errorMessage={errorText}
      value={value}
      {...props}
    />
  );
};

export default Input;
