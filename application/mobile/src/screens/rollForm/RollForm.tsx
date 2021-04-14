import React from "react";
import { Formik } from "formik";
import {
  View,
  StyleSheet,
  Button,
  Stepper,
  ScrollView
} from "../../components";
import RollFormStep0 from "./RollFormStep0";
import RollFormStep1 from "./RollFormStep1";
import RollFormStep2 from "./RollFormStep2";
import { resources } from "../../themeHelpers";

interface RollFormWizardProps {}
export type Participants = {
  name: string;
  phoneNumber: string | undefined;
};

export type FormValues = {
  name: string;
  description: string;
  date: Date;
  participants: Participants[];
};

const style = StyleSheet.create({
  rollForm: {
    flex: 1
  }
});

// const validate = {
//   1: (values: FormValues) => {
//     const errors = {};
//     if (!values.name) errors.name = "required";
//     return errors;
//   },
//   2: (values: FormValues) => {
//     const errors = {};
//     if (!values.description) errors.description = "required";
//     return errors;
//   },
//   3: (values: FormValues) => {
//     const errors = {};
//     if (!values.date) errors.date = "required";
//     return errors;
//   }
// };

const RollFormWizard: React.FC<RollFormWizardProps> = ({}) => {
  const [formValues, setFormValues] = React.useState<FormValues>({
    name: "",
    description: "",
    date: new Date(Date.now()),
    participants: [
      {
        name: "",
        phoneNumber: ""
      }
    ]
  });
  const [step, setStep] = React.useState(0);

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handleStep = (step: number) => {
    setStep(step);
  };

  const handleSubmit = (values: FormValues) => {
    console.log("formvalues : ", values);
  };

  return (
    <ScrollView style={style.rollForm}>
      <Stepper step={step} onStepChange={handleStep} />
      <Formik
        initialValues={formValues}
        onSubmit={handleSubmit}
        // validate={validate[step]}
      >
        {({ handleSubmit }) => (
          <View>
            {step === 0 && <RollFormStep0 />}
            {step === 1 && <RollFormStep1 />}
            {step === 2 && <RollFormStep2 />}
            <Button
              onPress={(e: any) => handleSubmit(e)}
              title={resources.submit}
            />
            <Button onPress={handleNext} title={resources.next} />
            <Button onPress={handlePrevious} title={resources.previous} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default RollFormWizard;
