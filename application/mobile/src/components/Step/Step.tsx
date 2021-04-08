import React from "react";
import View from "../View";
import Text from "../Text";
import TouchableOpacity from "../TouchableOpacity";
import StyleSheet from "../StyleSheet";
import Divider from "../Divider";
import { palette } from "../../themeHelpers";

interface StepProps {
  isActive: boolean;
  step: number;
  onStepChange: (s: number) => void;
}

const Step: React.FC<StepProps> = ({
  isActive,
  step,
  onStepChange,
  ...props
}) => {
  return (
    <View style={style.step}>
      {step !== 0 ? (
        <Divider style={style.divider} />
      ) : (
        <View style={style.emptyView} />
      )}
      <TouchableOpacity
        style={[style.textArea, isActive && style.textActive]}
        onPress={() => onStepChange(step)}
      >
        <Text>{step}</Text>
      </TouchableOpacity>
      {step !== 3 ? (
        <Divider style={style.divider} />
      ) : (
        <View style={style.emptyView} />
      )}
    </View>
  );
};

export default Step;

const style = StyleSheet.create({
  step: {
    display: "flex",
    flexDirection: "row",
    width: "25%",
    alignItems: "center",
    justifyContent: "center"
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
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: palette("black")
  },
  textActive: {
    borderColor: palette("red")
  }
});
