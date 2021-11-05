import { FormikValues, useFormikContext } from "formik";
import React from "react";
import { makeStyles } from "react-native-elements";
import { View, Text } from "../../components";
import { resources, shape } from "../../themeHelpers";

interface RollFormStep3Props {}

const useStyles = makeStyles((theme) => ({
  formStep: {
    marginTop: shape.spacing(3),
    marginLeft: shape.spacing(2),
    marginRight: shape.spacing(2)
  },
  title: {
    marginBottom: shape.spacing(3)
  }
}));

const RollFormStep3: React.FC<RollFormStep3Props> = ({}) => {
  const styles = useStyles();

  const { errors } = useFormikContext<FormikValues>();

  return (
    <View style={styles.formStep}>
      <Text h1 style={styles.title}>
        {resources.submit}
      </Text>
      {errors && Object.keys(errors).length > 0 && (
        <Text>{resources.formErrors}</Text>
      )}
    </View>
  );
};

export default RollFormStep3;
