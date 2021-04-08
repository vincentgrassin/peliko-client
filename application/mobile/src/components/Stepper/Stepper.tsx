import React from "react";
import View from "../View";
import Step from "../Step";
import StyleSheet from "../StyleSheet";

interface StepperProps {
  step: number;
  onStepChange: (s: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ step, onStepChange, ...props }) => {
  console.log(step);
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

const style = StyleSheet.create({
  stepper: { display: "flex", flexDirection: "row" }
});
