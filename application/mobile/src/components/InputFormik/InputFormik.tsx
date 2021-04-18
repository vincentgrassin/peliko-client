import React from "react";
import { useField, useFormikContext, FormikValues } from "formik";
import Input, { InputProps } from "../Input";

interface InputFormikProps extends InputProps {
  fieldName: string;
}

const InputFormik: React.FC<InputFormikProps> = ({ fieldName, ...props }) => {
  const { setFieldValue, values, errors } = useFormikContext<FormikValues>();

  const onChange = (val: string, fieldName: string) => {
    setFieldValue(fieldName, val);
  };

  const [field] = useField(fieldName);

  return (
    <Input
      {...props}
      value={values[fieldName]}
      onChangeText={(val) => onChange(val, field.name)}
      error={!!errors[fieldName]}
      errorText={errors[fieldName]}
    />
  );
};

export default InputFormik;
