import * as React from "react";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@env";
import { makeStyles } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import {
  View,
  Button,
  Icon,
  ScrollView,
  InputFormik,
  PhoneNumberInputFormik,
  NavigationHeader,
  Text,
} from "../../components";
import { resources, iconSet, shape, palette } from "../../themeHelpers";
import { useNavigation } from "../../utils/hooks/useNavigation";
import { useMutation } from "../../utils/hooks/useApolloClient";
import { LOG_IN, SIGN_UP } from "../../utils/helpers/mutation";
import { ScreenList } from "../../navigation/NavigationContainer";
import { loginSchema, LoginValues } from "../../utils/helpers/validationSchema";
import { defaultCountryCode } from "../../utils/helpers/constants";
import { useHandleServerError } from "../../utils/hooks/useHandleServerError";
import InputWrapper from "../../components/InputWrapper";
import { usePushNotification } from "../../utils/hooks/usePushNotifications";

interface LoginFormProps {}

const useStyles = makeStyles(() => ({
  container: { flex: 1 },
  scrollContainer: {
    marginTop: shape.spacing(4),
    flexGrow: 1,
  },
  formArea: {
    margin: shape.spacing(2),
    height: "100%",
  },
  inputArea: {
    flex: 1,
  },
  actionArea: {
    marginBottom: shape.spacing(6),
    marginLeft: shape.spacing(2),
    marginRight: shape.spacing(2),
  },
  action: {
    marginTop: shape.spacing(1),
  },
}));

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const [formValues, setFormValues] = React.useState<LoginValues>({
    userName: "",
    phoneNumber: { value: "", isValid: false, countryCode: defaultCountryCode },
    email: "",
    password: "",
    passwordConfirm: "",
    isSignUpForm: true,
  });
  const styles = useStyles();

  const [isSignUpForm, setIsSignUpForm] = React.useState<boolean>(true);
  const { errorMessage, resetErrorMessage, updateErrorMessage } =
    useHandleServerError();

  const { registerForPushNotificationsAsync } = usePushNotification();

  const [logIn] = useMutation(LOG_IN, {
    errorPolicy: "all",
  });
  const [signUp] = useMutation(SIGN_UP, {
    errorPolicy: "all",
  });

  const { navigate } = useNavigation();

  React.useEffect(() => {
    const getRefreshToken = async () => {
      try {
        const token = await AsyncStorage.getItem("@refreshToken");
        if (token !== null) {
          const response = await fetch(`${BASE_URL}/refresh_token/`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `refreshToken=${token}`,
          });
          const responseJson = await response.json();
          if (responseJson.ok) {
            navigate<ScreenList>("BottomNavigation");
            try {
              await AsyncStorage.setItem(
                "@refreshToken",
                responseJson.refreshToken
              );
              await AsyncStorage.setItem(
                "@accessToken",
                responseJson.accessToken
              );
            } catch (e) {
              console.log(e);
            }
          }
        }
      } catch (e) {}
    };
    getRefreshToken();
  }, [navigate]);

  const handleSubmit = async (values: LoginValues) => {
    resetErrorMessage();
    const { userName, password, phoneNumber } = values;
    let data: { accessToken: string; refreshToken: string };
    if (isSignUpForm) {
      const response = await signUp({
        variables: { name: userName, password, phoneNumber: phoneNumber.value },
      });
      if (response?.errors) {
        updateErrorMessage(response.errors);
        return;
      }
      data = response?.data?.createUser;
    } else {
      const response = await logIn({
        variables: { password, phoneNumber: phoneNumber.value },
      });
      data = response?.data?.login;
      if (response?.errors) {
        updateErrorMessage(response.errors);
        return;
      }
    }
    if (data) {
      await AsyncStorage.setItem("@accessToken", data.accessToken);
      await AsyncStorage.setItem("@refreshToken", data.refreshToken);
      navigate<ScreenList>("BottomNavigation");
      registerForPushNotificationsAsync();
      try {
        await AsyncStorage.setItem("@refreshToken", data.refreshToken);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <>
      <NavigationHeader
        color={palette("yellow")}
        text={isSignUpForm ? resources.subscribe : resources.connect}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView style={styles.container} behavior="height">
          <Formik
            initialValues={formValues}
            onSubmit={handleSubmit}
            validationSchema={loginSchema}
            enableReinitialize
          >
            {({ handleSubmit, errors, setFieldValue }) => (
              <View style={styles.formArea}>
                <View style={styles.inputArea}>
                  {isSignUpForm && (
                    <InputWrapper>
                      <InputFormik
                        fieldName="userName"
                        label={resources.userName}
                      />
                    </InputWrapper>
                  )}
                  <InputWrapper hasStartAdornment>
                    <PhoneNumberInputFormik
                      fieldName="phoneNumber"
                      label={resources.phoneNumber}
                    />
                  </InputWrapper>
                  <InputWrapper>
                    <InputFormik
                      fieldName="password"
                      label={resources.password}
                    />
                  </InputWrapper>
                  {isSignUpForm && (
                    <InputWrapper>
                      <InputFormik
                        fieldName="passwordConfirm"
                        label={resources.confirmPassword}
                      />
                    </InputWrapper>
                  )}
                </View>
                <View style={styles.actionArea}>
                  <Text isError>{errorMessage}</Text>
                  <Button
                    onPress={(e: any) => handleSubmit(e)}
                    title={resources.submit}
                    buttonStyle={styles.action}
                    icon={<Icon {...iconSet.bell} />}
                    disabled={errors && Object.keys(errors).length > 0}
                  />
                  <Button
                    type="outline"
                    buttonStyle={styles.action}
                    onPress={() => {
                      setFieldValue("isSignUpForm", !isSignUpForm);
                      setIsSignUpForm((prev) => !prev);
                      resetErrorMessage();
                    }}
                    title={isSignUpForm ? resources.logIn : resources.signUp}
                  />
                </View>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};

export default LoginForm;
