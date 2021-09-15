import React from "react";
import { useField, useFormikContext } from "formik";
import { Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { makeStyles } from "react-native-elements";
import { Button, Text, View } from "../../components";
import { FormValues } from "./RollForm";
import { resources, shape } from "../../themeHelpers";
import { getDateFormat } from "../../utils/helpers/dateHelper";

interface RollFormStep1Props {}

const useStyles = makeStyles((theme) => ({
  formStep: {
    marginTop: shape.spacing(3),
    marginLeft: shape.spacing(2),
    marginRight: shape.spacing(2)
  },
  title: {
    marginBottom: shape.spacing(3)
  },
  datePicker: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "flex-start"
  },
  date: {
    alignSelf: "center",
    marginLeft: shape.spacing(3)
  }
}));
const RollFormStep1: React.FC<RollFormStep1Props> = ({ ...props }) => {
  const styles = useStyles();
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
    <View style={styles.formStep}>
      <Text h1 style={styles.title}>
        {resources.closingDate}
      </Text>
      <View style={styles.datePicker}>
        <Button onPress={showDatepicker} title={resources.pickDate} />
        <Text h3 style={styles.date}>
          {getDateFormat(field.value)}
        </Text>
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
    </View>
  );
};

export default RollFormStep1;
