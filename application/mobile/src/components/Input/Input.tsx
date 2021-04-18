import React from "react";
import { FormikErrors } from "formik";
import {
  Input as ReactNativeInput,
  InputProps as ReactNativeInputProps
} from "react-native-elements";

export interface InputProps extends ReactNativeInputProps {
  error?: boolean;
  errorText?:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
}

const Input: React.FC<InputProps> = ({ error, errorText, ...props }) => {
  return <ReactNativeInput {...props} />;
};

export default Input;
