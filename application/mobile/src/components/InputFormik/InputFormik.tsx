import React from "react";
import { useField } from "formik";
import Input, { InputProps } from "../Input";

interface InputFormikProps extends InputProps {
  fieldName: string;
}

const InputFormik: React.FC<InputFormikProps> = ({ fieldName, ...props }) => {
  const [field, meta, helpers] = useField(fieldName);

  const handleChange = (val: string) => {
    helpers.setValue(val);
  };

  return (
    <Input
      {...props}
      value={field.value}
      onChangeText={handleChange}
      errorText={meta.error as string}
    />
  );
};

export default InputFormik;
