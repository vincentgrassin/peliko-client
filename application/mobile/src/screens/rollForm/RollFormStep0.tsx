import React from "react";
import { useField, useFormikContext } from "formik";
import { View, Input, StyleSheet } from "../../components";
import { FormValues } from "./RollForm";

interface RollFormStep0Props {}

const style = StyleSheet.create({
  RollFormStep0: {
    marginTop: 100
  }
});

const RollFormStep0: React.FC<RollFormStep0Props> = ({}) => {
  const { setFieldValue, values, errors } = useFormikContext<FormValues>();

  const onChange = (val: string, fieldName: string) => {
    setFieldValue(fieldName, val);
  };
  const [nameField] = useField("name");
  const [descriptionField] = useField("description");

  return (
    <View style={style.RollFormStep0}>
      <>
        <Input
          label={nameField.name}
          value={values.name}
          onChangeText={(val) => onChange(val, nameField.name)}
        />
        <Input
          label={descriptionField.name}
          value={values.description}
          onChangeText={(val) => onChange(val, descriptionField.name)}
        />
      </>
      {errors.name && (
        <View style={{ backgroundColor: "red" }}>{errors.name}</View>
      )}
    </View>
  );
};

export default RollFormStep0;
