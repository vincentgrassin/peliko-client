import React from "react";
import { useField, useFormikContext } from "formik";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Text, View, StyleSheet } from "../../components";
import { FormValues } from "./RollForm";

interface RollFormStep1Props {}

const style = StyleSheet.create({
  RollFormStep1: {
    marginTop: 100
  }
});

const RollFormStep1: React.FC<RollFormStep1Props> = ({ ...props }) => {
  const { setFieldValue, errors } = useFormikContext<FormValues>();
  const [field] = useField("date");
  const [show, setShow] = React.useState(false);

  const onChange = (event: any, selectedDate: Date | undefined) => {
    setShow(Platform.OS === "ios");
    setFieldValue(field.name, selectedDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <View style={style.RollFormStep1}>
      <View>
        <View>
          <Button onPress={showDatepicker} title="Show date picker!" />
        </View>
        {show && (
          <DateTimePicker
            {...field}
            {...props}
            value={(field.value && new Date(field.value)) || null}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        <Text>{JSON.stringify(field.value)} </Text>
      </View>
      {errors.name && (
        <View style={{ backgroundColor: "red" }}>{errors.name}</View>
      )}
    </View>
  );
};

export default RollFormStep1;
