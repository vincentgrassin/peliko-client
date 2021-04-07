import React from "react";
import { View, Text, StyleSheet, Button } from "../../components";
import RollFormStep0 from "./RollFormStep0";
import RollFormStep1 from "./RollFormStep1";
import RollFormStep2 from "./RollFormStep2";
import { Formik } from "formik";

interface RollFormWizardProps {}
export type Participants = {
  name: string;
  phoneNumber: string;
};

export type FormValues = {
  name: string;
  description: string;
  date: any;
  participants: Participants[];
};

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

  const handleSubmit = (values: FormValues) => {
    console.log("formvalues : ", values);
  };

  return (
    <View style={style.rollForm}>
      <Text>roll form</Text>
      <Formik
        initialValues={formValues}
        onSubmit={handleSubmit}
        // validate={validate[step]}
      >
        {({ handleSubmit }) => (
          <View>
            <Button onPress={(e: any) => handleSubmit(e)} title="Submit" />
            <Button onPress={handleNext} title="Next" />
            <Button onPress={handlePrevious} title="Previous" />
            {step === 0 && <RollFormStep0 />}
            {step === 1 && <RollFormStep1 />}
            {step === 2 && <RollFormStep2 />}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default RollFormWizard;

const style = StyleSheet.create({
  rollForm: {
    flex: 1
  }
});
