import React from "react";
import { View, Input, Text, StyleSheet, Button } from "../../components";

interface RollFormStep0Props {
  handleChange: (text: string) => void;
  handleBlur: (e: any) => void;
  values: any;
  errors: any;
}

const RollFormStep0: React.FC<RollFormStep0Props> = ({
  values,
  errors,
  handleChange,
  handleBlur
}) => {
  return (
    <View style={style.RollFormStep0}>
      <>
        <Input
          label="name"
          value={values.name}
          //@ts-ignore
          onChangeText={handleChange("name")}
          //@ts-ignore
          onBlur={handleBlur("name")}
        />
        <Input
          label="description"
          value={values.description}
          //@ts-ignore
          onChangeText={handleChange("description")}
          //@ts-ignore
          onBlur={handleBlur("description")}
        />
      </>
      {errors.name && (
        <View style={{ backgroundColor: "red" }}>{errors.name}</View>
      )}
    </View>
  );
};

export default RollFormStep0;

const style = StyleSheet.create({
  RollFormStep0: {
    marginTop: 100
  }
});
