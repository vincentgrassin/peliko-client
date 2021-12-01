import React from "react";
import { isValidNumber } from "react-native-phone-number-input";
import { FormikValues, useFormikContext } from "formik";
import { defaultCountryCode } from "../../utils/helpers/constants";
import PhoneNumberInput, { CustomPhoneInputProps } from "../PhoneNumberInput";
import { getNumberAfterPossiblyEliminatingZero } from "../../utils/helpers/dataCheckHelper";

interface PhoneNumberInputPropsFormik extends CustomPhoneInputProps {
  fieldName: string;
}

const PhoneNumberInputFormik: React.FC<PhoneNumberInputPropsFormik> = ({
  fieldName
}) => {
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
      />
    </>
  );
};

export default PhoneNumberInputFormik;
