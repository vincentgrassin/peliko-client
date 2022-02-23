import * as React from "react";
import { makeStyles } from "react-native-elements";
import PhoneInput, { PhoneInputProps } from "react-native-phone-number-input";
import { typography } from "../../themeHelpers";
import { defaultCountryCode } from "../../utils/helpers/constants";
import Text from "../Text";

export interface CustomPhoneInputProps extends PhoneInputProps {
  errorMessage?: {
    isValid: string;
    value: string;
  };
}

const useStyles = makeStyles(() => ({
  errorText: {
    fontSize: typography.fontSize.xs
  }
}));

const CustomPhoneInputProps: React.FC<CustomPhoneInputProps> = ({
  errorMessage,
  ...props
}) => {
  const styles = useStyles();
  return (
    <>
      <PhoneInput defaultCode={defaultCountryCode} layout="first" {...props} />
      {errorMessage?.isValid && (
        <Text isError style={styles.errorText}>
          {errorMessage?.isValid}
        </Text>
      )}
      {errorMessage?.value && (
        <Text isError style={styles.errorText}>
          {errorMessage?.value}
        </Text>
      )}
    </>
  );
};

export default CustomPhoneInputProps;
