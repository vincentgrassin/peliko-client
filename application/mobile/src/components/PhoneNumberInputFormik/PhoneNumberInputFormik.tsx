import * as React from "react";
import { makeStyles } from "react-native-elements";
import { isValidNumber } from "react-native-phone-number-input";
import { FormikValues, useFormikContext } from "formik";
import { defaultCountryCode } from "../../utils/helpers/constants";
import PhoneNumberInput, { CustomPhoneInputProps } from "../PhoneNumberInput";
import { getNumberAfterPossiblyEliminatingZero } from "../../utils/helpers/dataCheckHelper";
import { palette } from "../../themeHelpers";

interface PhoneNumberInputPropsFormik extends CustomPhoneInputProps {
  fieldName: string;
  label?: string;
  onFocus?: (e: any) => any;
}

const useStyles = makeStyles(() => ({
  input: {
    backgroundColor: palette("white", 0)
  }
}));

const PhoneNumberInputFormik: React.FC<PhoneNumberInputPropsFormik> = ({
  fieldName,
  label,
  onFocus
}) => {
  const styles = useStyles();

  const { setFieldValue, errors, values } = useFormikContext<FormikValues>();
  const updatePhoneNumberValue = (value: string, countryCode: any) => {
    const check = isValidNumber(value, countryCode);
    const formattedNumber = getNumberAfterPossiblyEliminatingZero(value);
    setFieldValue(fieldName, {
      value: formattedNumber,
      isValid: check,
      countryCode
    });
  };

  const handleInputChange = (value: string) => {
    const countryCode = values[fieldName].countryCode ?? defaultCountryCode;
    updatePhoneNumberValue(value, countryCode);
  };

  const handleCountryChange = (country: any) => {
    const value = values[fieldName].value ?? "";
    const countryCode = country.cca2;
    updatePhoneNumberValue(value, countryCode);
  };

  return (
    <>
      <PhoneNumberInput
        onChangeText={handleInputChange}
        value={values[fieldName].value}
        onChangeCountry={handleCountryChange}
        //@ts-ignore
        errorMessage={errors.phoneNumber}
        containerStyle={styles.input}
        placeholder=" "
        textContainerStyle={styles.input}
        textInputProps={{
          onFocus,
          accessibilityLabel: label
        }}
      />
    </>
  );
};

export default PhoneNumberInputFormik;
