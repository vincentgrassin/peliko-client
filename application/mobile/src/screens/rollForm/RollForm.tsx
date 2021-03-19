import React from "react";
import { View, Text, StyleSheet, FormStep, Button } from "../../components";
import { Formik } from "formik";

interface RollFormWizardProps {}

type FormValues = {
  name: string;
  description: string;
  date: any;
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
    date: ""
  }); // a typer
  const [step, setStep] = React.useState(0);

  console.log(step);

  const handlePrevious = () => {
    console.log("prevoious");
    if (step > 0) {
      console.log("condition");
      setStep(step - 1);
    }
  };
  const handleNext = () => {
    if (step < 1) {
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
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <Button onPress={(e: any) => handleSubmit(e)} title="Submit" />
            <Button onPress={handleNext} title="Next" />
            <Button onPress={handlePrevious} title="Previous" />
            {step === 0 && (
              <FormStep
                step={0}
                values={values}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            )}
            {step === 1 && (
              <FormStep
                step={1}
                values={values}
                errors={errors}
                handleChange={handleChange}
                handleBlur={handleBlur}
              />
            )}
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
