import React from "react";
import { makeStyles } from "react-native-elements";
import View from "../View";
import Text from "../Text";
import TouchableOpacity from "../TouchableOpacity";
import Divider from "../Divider";
import { palette } from "../../themeHelpers";
import { getAlternateColor } from "../../utils/helpers/colorHelper";

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
      width: "25%",
      alignItems: "center"
    },
    divider: {
      width: "25%",
      borderBottomWidth: 2,
      borderBottomColor: palette("black")
    },
    emptyView: {
      width: "25%"
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

const Step: React.FC<StepProps> = ({
  isActive,
  step,
  onStepChange,
  ...props
}) => {
  const styles = useStyles(step);
  return (
    <View style={styles.step}>
      {step !== 0 ? (
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
      {step !== 3 ? (
        <Divider style={styles.divider} />
      ) : (
        <View style={styles.emptyView} />
      )}
    </View>
  );
};

export default Step;
