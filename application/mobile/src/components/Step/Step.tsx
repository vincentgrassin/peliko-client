import * as React from "react";
import { makeStyles } from "react-native-elements";
import View from "../View";
import Text from "../Text";
import TouchableOpacity from "../TouchableOpacity";
import Divider from "../Divider";
import { palette } from "../../themeHelpers";
import { getAlternateColor } from "../../utils/helpers/colorHelper";
import {
  ROLL_CREATION_FIRST_STEP,
  ROLL_CREATION_LAST_STEP
} from "../../utils/helpers/constants";

interface StepProps {
  isActive: boolean;
  step: number;
  onStepChange: (s: number) => void;
}

const useStyles = makeStyles((theme, step: number) => {
  return {
    step: {
      display: "flex",
      flexDirection: "row",
      width: "33%",
      alignItems: "center"
    },
    divider: {
      width: "34%",
      borderBottomWidth: 2,
      borderBottomColor: palette("black")
    },
    emptyView: {
      width: "33%"
    },
    textArea: {
      width: 45,
      height: 45,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: palette("black")
    },
    textActive: {
      backgroundColor: getAlternateColor(step)
    }
  };
});

const Step: React.FC<StepProps> = ({ isActive, step, onStepChange }) => {
  const styles = useStyles(step);
  return (
    <View style={styles.step}>
      {step !== ROLL_CREATION_FIRST_STEP ? (
        <Divider style={styles.divider} />
      ) : (
        <View style={styles.emptyView} />
      )}
      <TouchableOpacity
        style={[styles.textArea, isActive && styles.textActive]}
        onPress={() => onStepChange(step)}
      >
        <Text h2>{step}</Text>
      </TouchableOpacity>
      {step !== ROLL_CREATION_LAST_STEP ? (
        <Divider style={styles.divider} />
      ) : (
        <View style={styles.emptyView} />
      )}
    </View>
  );
};

export default Step;
