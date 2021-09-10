import React from "react";
import View from "../View";
import Step from "../Step";
import StyleSheet from "../StyleSheet";
import { shape } from "../../themeHelpers";

interface StepperProps {
  step: number;
  onStepChange: (s: number) => void;
}

const style = StyleSheet.create({
  stepper: {
    display: "flex",
    flexDirection: "row",
    marginTop: shape.spacing(2)
  }
});

const Stepper: React.FC<StepperProps> = ({ step, onStepChange, ...props }) => {
  return (
    <View style={style.stepper}>
      <Step step={0} isActive={step === 0} onStepChange={onStepChange} />
      <Step step={1} isActive={step === 1} onStepChange={onStepChange} />
      <Step step={2} isActive={step === 2} onStepChange={onStepChange} />
      <Step step={3} isActive={step === 3} onStepChange={onStepChange} />
    </View>
  );
};

export default Stepper;
