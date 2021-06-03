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
import { useMutation } from "../../utils/hooks/useApolloClient";
import { CREATE_ROLL } from "../../utils/helpers/mutation";
import { useNavigationContext } from "../../navigation/NavigationContext";

interface RollFormWizardProps {}
export type ParticipantContact = {
  name: string;
  phoneNumber: string | undefined;
};

export type FormValues = {
  rollName: string;
  description: string;
  date: Date;
  participantsContact: ParticipantContact[];
};

const style = StyleSheet.create({
  rollForm: {
    flex: 1
  }
});

const RollFormWizard: React.FC<RollFormWizardProps> = ({}) => {
  const [createRoll, { data }] = useMutation(CREATE_ROLL);
  const { userId } = useNavigationContext();
  const [formValues, setFormValues] = React.useState<FormValues>({
    rollName: "",
    description: "",
    date: new Date(Date.now()),
    participantsContact: [
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
    const { date, description, participantsContact, rollName } = values;
    // will have to manage error validation and double management
    createRoll({
      variables: {
        rollData: {
          name: rollName,
          deliveryType: "digital",
          description,
          closingDate: date,
          participants: participantsContact
        },
        userId
      }
    });
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
