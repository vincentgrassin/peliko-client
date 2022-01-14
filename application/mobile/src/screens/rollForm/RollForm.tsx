import * as React from "react";
import { Formik } from "formik";
import { makeStyles } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import {
  View,
  Button,
  Stepper,
  ScrollView,
  NavigationHeader
} from "../../components";
import RollFormStep0 from "./RollFormStep0";
import RollFormStep1 from "./RollFormStep1";
import RollFormStep2 from "./RollFormStep2";
import { palette, resources, shape } from "../../themeHelpers";
import { useMutation } from "../../utils/hooks/useApolloClient";
import { CREATE_ROLL } from "../../utils/helpers/mutation";
import {
  rollCreationSchema,
  RollCreationValues
} from "../../utils/helpers/validationSchema";
import { GET_ROLLS_BY_USER } from "../../utils/helpers/queries";
import { useNavigation } from "../../utils/hooks/useNavigation";
import { ScreenList } from "../../navigation/NavigationContainer";
import Modal from "../../components/Modal";
import { useModal } from "../../utils/hooks/useModal";
import {
  ROLL_CREATION_FIRST_STEP,
  ROLL_CREATION_LAST_STEP
} from "../../utils/helpers/constants";

interface RollFormWizardProps {}

const useStyles = makeStyles(() => ({
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

  const [createRoll] = useMutation(CREATE_ROLL);
  const { navigate } = useNavigation();
  const { openModal, closeModal, isOpen: isVisibleModal } = useModal();
  const initialValues = React.useMemo(() => {
    return {
      rollName: "",
      description: "",
      date: new Date(Date.now()),
      participantsContact: []
    };
  }, []);

  const [step, setStep] = React.useState(0);

  const handlePrevious = () => {
    if (step > ROLL_CREATION_FIRST_STEP) {
      setStep(step - 1);
    }
  };
  const handleNext = () => {
    if (step < ROLL_CREATION_LAST_STEP) {
      setStep(step + 1);
    }
  };

  const handleStep = (step: number) => {
    setStep(step);
  };

  const handleSubmission = async (values: RollCreationValues) => {
    const { date, description, participantsContact, rollName } = values;
    openModal();
    const response = await createRoll({
      variables: {
        rollData: {
          name: rollName,
          deliveryType: "digital",
          description,
          closingDate: date,
          participants: participantsContact.map(({ name, phoneNumber }) => {
            return {
              phoneNumber: phoneNumber.value,
              name
            };
          })
        }
      },
      refetchQueries: [
        { query: GET_ROLLS_BY_USER, variables: { isOpenTab: true } }
      ],
      awaitRefetchQueries: true
    });
    closeModal();
    if (response?.data) {
      navigate<ScreenList>("RollScreen", {
        backgroundColor: palette("blue"),
        rollId: response.data.createRoll.id,
        isOpenRoll: true
      });
      return true;
    }
    return false;
  };

  return (
    <>
      <NavigationHeader
        text={resources.rollCreationScreen}
        screen="Home"
        color={palette("yellow")}
      />
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Stepper step={step} onStepChange={handleStep} />
          <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setValues }) => {
              const isSubmissionOk = await handleSubmission(values);
              isSubmissionOk && setValues(initialValues);
            }}
            validationSchema={rollCreationSchema}
          >
            {({ handleSubmit, errors }) => (
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
                  {step === ROLL_CREATION_LAST_STEP ? (
                    <Button
                      onPress={handleSubmit as any}
                      title={resources.submit}
                      containerStyle={styles.actionButton}
                      disabled={Object.keys(errors).length > 0}
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
      <Modal
        isVisible={isVisibleModal}
        color={palette("green")}
        text={resources.processingRoll}
        modalType="loading"
        image="eye"
      />
    </>
  );
};

export default RollFormWizard;
