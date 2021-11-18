import React from "react";
import PhoneInput, { PhoneInputProps } from "react-native-phone-number-input";
import { FormikValues, useFormikContext } from "formik";
import Text from "../Text";

interface PhoneNumberInputProps extends PhoneInputProps {
  fieldName: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ fieldName }) => {
  const {
    setFieldValue,
    errors,
    setFieldError
  } = useFormikContext<FormikValues>();
  const [value, setValue] = React.useState("");
  const phoneInput = React.useRef<PhoneInput>(null);

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
        withDarkTheme
        withShadow
        autoFocus
      />
      {errors[fieldName]?.isValid && <Text>{errors[fieldName]?.isValid}</Text>}
      {errors[fieldName]?.value && <Text>{errors[fieldName]?.value}</Text>}
    </>
  );
};

export default PhoneNumberInput;
