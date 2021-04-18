import React from "react";
import { View, StyleSheet, InputFormik } from "../../components";
import { resources } from "../../themeHelpers";

interface RollFormStep0Props {}

const style = StyleSheet.create({
  RollFormStep0: {
    marginTop: 100
  }
});

const RollFormStep0: React.FC<RollFormStep0Props> = ({}) => {
  return (
    <View style={style.RollFormStep0}>
      <InputFormik fieldName="rollName" label={resources.name} />
      <InputFormik fieldName="description" label={resources.description} />
    </View>
  );
};

export default RollFormStep0;
