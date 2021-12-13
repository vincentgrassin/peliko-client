import * as React from "react";
import { makeStyles } from "react-native-elements";
import { View, InputFormik, Text } from "../../components";
import { resources, shape } from "../../themeHelpers";

interface RollFormStep0Props {}

const useStyles = makeStyles(() => ({
  formStep: {
    marginTop: shape.spacing(3),
    marginLeft: shape.spacing(2),
    marginRight: shape.spacing(2)
  },
  title: {
    marginBottom: shape.spacing(3)
  }
}));

const RollFormStep0: React.FC<RollFormStep0Props> = ({}) => {
  const styles = useStyles();

  return (
    <View style={styles.formStep}>
      <Text h1 style={styles.title}>
        {resources.nameAndDescription}
      </Text>
      <InputFormik fieldName="rollName" label={resources.name} />
      <InputFormik fieldName="description" label={resources.description} />
    </View>
  );
};

export default RollFormStep0;
