import React from "react";
import View from "../View";
import Text from "../Text";
import Input from "../Input";
import StyleSheet from "../StyleSheet";
import DatePicker from "../DatePicker";

interface FormStepProps {
  handleChange: (text: string) => void;
  handleBlur: (e: any) => void;
  values: any;
  errors: any;
  step: number;
}

const FormStep: React.FC<FormStepProps> = ({
  values,
  errors,
  handleChange,
  handleBlur,
  step
}) => {
  console.log("input", values);
  return (
    <View style={style.formStep}>
      {step === 0 && (
        <>
          <Input
            label="name"
            value={values.name}
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
          />
          <Input
            label="description"
            value={values.description}
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
          />
        </>
      )}
      {step === 1 && (
        <>
          <Input
            label="date"
            value={values.date}
            onChangeText={handleChange("date")}
            onBlur={handleBlur("date")}
          />
          <DatePicker />
        </>
      )}
      {errors.name && (
        <View style={{ backgroundColor: "red" }}>{errors.name}</View>
      )}
    </View>
  );
};

export default FormStep;

const style = StyleSheet.create({
  formStep: {
    marginTop: 100
  }
});
