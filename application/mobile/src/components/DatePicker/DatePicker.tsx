import React from "react";
import View from "../View";
import Text from "../Text";
import Button from "../Button";
import { Platform } from "react-native";
import DateTimePicker, {
  BaseProps // add to props
} from "@react-native-community/datetimepicker";
import { useField, useFormikContext } from "formik";

interface DatePickerProps {
  value: any;
}

const DatePicker: React.FC<DatePickerProps> = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField("date");

  const [show, setShow] = React.useState(false);

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    setFieldValue(field.name, selectedDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
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
  );
};

export default DatePicker;
