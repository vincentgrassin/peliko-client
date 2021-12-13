import * as React from "react";
import { makeStyles } from "react-native-elements";
import View from "../View";
import Step from "../Step";
import { shape } from "../../themeHelpers";

interface StepperProps {
  step: number;
  onStepChange: (s: number) => void;
}

const useStyles = makeStyles(() => ({
  stepper: {
    display: "flex",
    flexDirection: "row",
    marginTop: shape.spacing(2)
  }
}));

const Stepper: React.FC<StepperProps> = ({ step, onStepChange }) => {
  const styles = useStyles();
  return (
    <View style={styles.stepper}>
      <Step step={0} isActive={step === 0} onStepChange={onStepChange} />
      <Step step={1} isActive={step === 1} onStepChange={onStepChange} />
      <Step step={2} isActive={step === 2} onStepChange={onStepChange} />
      <Step step={3} isActive={step === 3} onStepChange={onStepChange} />
    </View>
  );
};

export default Stepper;
