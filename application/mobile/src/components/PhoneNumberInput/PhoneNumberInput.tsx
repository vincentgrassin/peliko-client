import * as React from "react";
import { makeStyles } from "react-native-elements";
import PhoneInput, { PhoneInputProps } from "react-native-phone-number-input";
import { palette, shape, typography } from "../../themeHelpers";
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
    fontSize: typography.fontSize.xs,
    marginLeft: shape.spacing(2)
  },
  input: {
    backgroundColor: palette("white", 0),
    paddingBottom: shape.spacing(1)
  },
  container: {
    backgroundColor: palette("white", 0),
    borderBottomWidth: 1,
    borderBottomColor: palette("lightGrey"),
    width: "95%",
    marginLeft: shape.spacing(1)
  }
}));

const CustomPhoneInputProps: React.FC<CustomPhoneInputProps> = ({
  errorMessage,
  ...props
}) => {
  const styles = useStyles();
  return (
    <>
      <PhoneInput
        defaultCode={defaultCountryCode}
        layout="first"
        textContainerStyle={styles.input}
        containerStyle={styles.container}
        {...props}
      />
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
