import React from "react";
import { Formik } from "formik";
import { makeStyles } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import { View, Button, Stepper, ScrollView, Text } from "../../components";
import RollFormStep0 from "./RollFormStep0";
import RollFormStep1 from "./RollFormStep1";
import RollFormStep2 from "./RollFormStep2";
import { resources, shape } from "../../themeHelpers";
import { useMutation } from "../../utils/hooks/useApolloClient";
import { CREATE_ROLL } from "../../utils/helpers/mutation";

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

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1
  },
  scrollContainer: {
    flexGrow: 1
  },
  formActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: shape.spacing(3)
  },
  actionButton: {
    width: "45%"
  },
  formStep: {
    flex: 1
  },
  form: {
    height: "100%"
  }
}));

const RollFormWizard: React.FC<RollFormWizardProps> = ({}) => {
  const styles = useStyles();

  const [createRoll, { data }] = useMutation(CREATE_ROLL);
  const [formValues, setFormValues] = React.useState<FormValues>({
    rollName: "",
    description: "",
    date: new Date(Date.now()),
    participantsContact: []
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
    const { date, description, participantsContact, rollName } = values;
    // will have to manage error validation and duplicates
    createRoll({
      variables: {
        rollData: {
          name: rollName,
          deliveryType: "digital",
          description,
          closingDate: date,
          participants: participantsContact
        }
      }
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Stepper step={step} onStepChange={handleStep} />
        <Formik initialValues={formValues} onSubmit={handleSubmit}>
          {({ handleSubmit }) => (
            <>
              <View style={styles.formStep}>
                {step === 0 && <RollFormStep0 />}
                {step === 1 && <RollFormStep1 />}
                {step === 2 && <RollFormStep2 />}
              </View>
              <View style={styles.formActions}>
                {step !== 0 ? (
                  <Button
                    onPress={handlePrevious}
                    title={resources.previous}
                    containerStyle={styles.actionButton}
                    type="outline"
                  />
                ) : (
                  <View style={styles.actionButton} />
                )}
                {step === 2 ? (
                  <Button
                    onPress={(e: any) => handleSubmit(e)}
                    title={resources.submit}
                    containerStyle={styles.actionButton}
                  />
                ) : (
                  <Button
                    onPress={handleNext}
                    title={resources.next}
                    containerStyle={styles.actionButton}
                  />
                )}
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RollFormWizard;
