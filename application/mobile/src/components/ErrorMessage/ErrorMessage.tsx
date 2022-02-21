import * as React from "react";
import { ApolloError } from "@apollo/client";
import Text from "../Text";
import { resources } from "../../themeHelpers";
import { useHandleQueryError } from "../../utils/hooks/useHandleQueryError";

interface ErrorMessageProps {
  message: React.ReactNode;
  error?: ApolloError;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  error = null
}) => {
  const { handleError } = useHandleQueryError();
  error && handleError(error);

  return (
    <Text>
      {resources.baseErrorMessage} {message}
    </Text>
  );
};
export default ErrorMessage;
