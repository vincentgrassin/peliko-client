import React from "react";
import PhoneInput, { PhoneInputProps } from "react-native-phone-number-input";

export interface CustomPhoneInputProps extends PhoneInputProps {}

const CustomPhoneInputProps: React.FC<CustomPhoneInputProps> = ({
  onChangeText,
  value,
  ...props
}) => {
  const phoneInput = React.useRef<PhoneInput>(null);

  // const [value, setValue] = React.useState("");
  // const checkValid = phoneInput.current?.isValidNumber(value);

  // const handleChangeText = React.useCallback((text) => {
  //   setValue(text);
  // }, []);

  return (
    <PhoneInput
      ref={phoneInput}
      // defaultValue={value}
      defaultCode="FR"
      layout="first"
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default CustomPhoneInputProps;
