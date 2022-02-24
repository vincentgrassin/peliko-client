import * as React from "react";
import { ApolloError } from "@apollo/client";
import Text from "../Text";
import { resources } from "../../themeHelpers";
import { useHandleServerError } from "../../utils/hooks/useHandleServerError";

interface ErrorMessageProps {
  message: React.ReactNode;
  error?: ApolloError;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  error = null
}) => {
  const { handleError } = useHandleServerError();
  error && handleError(error);

  return (
    <Text>
      {resources.baseErrorMessage} {message}
    </Text>
  );
};
export default ErrorMessage;
