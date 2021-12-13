import * as React from "react";
import Text from "../Text";
import { resources } from "../../themeHelpers";

interface ErrorMessageProps {
  message: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Text>
      {resources.baseErrorMessage} {message}
    </Text>
  );
};
export default ErrorMessage;
