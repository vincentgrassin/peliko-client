import React from "react";
import PhoneInput, { PhoneInputProps } from "react-native-phone-number-input";
import { FormikValues, useFormikContext } from "formik";
import { makeStyles } from "react-native-elements";
import Text from "../Text";
import { palette, typography } from "../../themeHelpers";

interface PhoneNumberInputPropsFormik extends PhoneInputProps {
  fieldName: string;
}

const useStyles = makeStyles((theme) => ({
  errorText: {
    color: palette("red"),
    fontSize: typography.fontSize.xs
  }
}));

const PhoneNumberInputFormik: React.FC<PhoneNumberInputPropsFormik> = ({
  fieldName
}) => {
  const {
    setFieldValue,
    errors,
    setFieldError
  } = useFormikContext<FormikValues>();
  const [value, setValue] = React.useState("");
  const phoneInput = React.useRef<PhoneInput>(null);
  const styles = useStyles();

  React.useEffect(() => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    setFieldValue(fieldName, { value, isValid: checkValid || false });
  }, [fieldName, value, setFieldValue, setFieldError]);

  const handleChangeText = React.useCallback((text) => {
    setValue(text);
  }, []);

  return (
    <>
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="FR"
        layout="first"
        onChangeText={handleChangeText}
      />
      {
        //@ts-ignore
        errors[fieldName]?.isValid && (
          //@ts-ignore
          <Text style={styles.errorText}>{errors[fieldName]?.isValid}</Text>
        )
      }
      {
        //@ts-ignore
        errors[fieldName]?.value && (
          //@ts-ignore
          <Text style={styles.errorText}>{errors[fieldName]?.value}</Text>
        )
      }
    </>
  );
};

export default PhoneNumberInputFormik;
