import React from "react";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import { BASE_URL } from "@env";
import { makeStyles } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import { View, Button, Icon, ScrollView, InputFormik } from "../../components";
import { resources, iconSet, shape } from "../../themeHelpers";
import { useNavigation } from "../../utils/hooks/useNavigation";
import { useMutation } from "../../utils/hooks/useApolloClient";
import { LOG_IN, SIGN_UP } from "../../utils/helpers/mutation";

interface LoginFormProps {}
export type LoginInformation = {
  phoneNumber: string | undefined;
  password: string;
  email?: string;
  userName?: string;
  passwordConfirm?: string;
};

const useStyles = makeStyles((theme) => ({
  container: { flex: 1 },
  scrollContainer: {
    flexGrow: 1
  },
  formArea: {
    margin: shape.spacing(2),
    height: "100%"
  },
  inputArea: {
    flex: 1
  },
  actionArea: {
    marginBottom: shape.spacing(6),
    marginLeft: shape.spacing(2),
    marginRight: shape.spacing(2)
  },
  action: {
    marginTop: shape.spacing(1)
  }
}));

const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
});

const LoginForm: React.FC<LoginFormProps> = ({ ...props }) => {
  const [formValues, setFormValues] = React.useState<LoginInformation>({
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });
  const styles = useStyles();

  const [isSignUpForm, setIsSignUpForm] = React.useState<boolean>(true);
  const [logIn] = useMutation(LOG_IN);
  const [signUp] = useMutation(SIGN_UP);

  const { navigate } = useNavigation();

  React.useEffect(() => {
    const getRefreshToken = async () => {
      try {
        const token = await AsyncStorage.getItem("@refreshToken");
        if (token !== null) {
          const response = await fetch(`${BASE_URL}/refresh_token/`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `refreshToken=${token}`
          });
          const responseJson = await response.json();
          if (responseJson.ok) {
            navigate("BottomNavigation");
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

  const handleSubmit = async (values: LoginInformation) => {
    const { userName, password, phoneNumber } = values;
    let data: { accessToken: string; refreshToken: string };
    if (isSignUpForm) {
      const response = await signUp({
        variables: { name: userName, password, phoneNumber }
      });
      data = response.data.createUser;
    } else {
      const response = await logIn({ variables: { password, phoneNumber } });
      data = response.data.login;
    }
    if (data) {
      await AsyncStorage.setItem("@accessToken", data.accessToken);
      await AsyncStorage.setItem("@refreshToken", data.refreshToken);

      navigate("BottomNavigation");
      try {
        await AsyncStorage.setItem("@refreshToken", data.refreshToken);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <Formik
          initialValues={formValues}
          onSubmit={handleSubmit}
          validationSchema={LoginSchema}
        >
          {({ handleSubmit }) => (
            <View style={styles.formArea}>
              <View style={styles.inputArea}>
                {isSignUpForm && (
                  <InputFormik
                    fieldName="userName"
                    label={resources.userName}
                  />
                )}
                <InputFormik
                  fieldName="phoneNumber"
                  label={resources.phoneNumber}
                />
                <InputFormik fieldName="password" label={resources.password} />
                {isSignUpForm && (
                  <InputFormik
                    fieldName="passwordConfirm"
                    label={resources.confirmPassword}
                  />
                )}
              </View>
              <View style={styles.actionArea}>
                <Button
                  onPress={(e: any) => handleSubmit(e)}
                  title={resources.submit}
                  buttonStyle={styles.action}
                  icon={
                    <Icon type={iconSet.bell.type} name={iconSet.bell.name} />
                  }
                />
                <Button
                  type="outline"
                  buttonStyle={styles.action}
                  onPress={() => setIsSignUpForm((prev) => !prev)}
                  title={isSignUpForm ? resources.signUp : resources.signIn}
                />
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginForm;
