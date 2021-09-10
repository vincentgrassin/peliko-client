import React from "react";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Yup from "yup";
import { BASE_URL } from "@env";
import {
  View,
  StyleSheet,
  Button,
  Icon,
  ScrollView,
  InputFormik
} from "../../components";
import { resources, iconSet } from "../../themeHelpers";
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

const style = StyleSheet.create({
  rollForm: {
    flex: 1
  }
});

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

  const logOut = async () => {
    await AsyncStorage.setItem("@accessToken", "");
  };

  return (
    <ScrollView style={style.rollForm}>
      <Formik
        initialValues={formValues}
        onSubmit={handleSubmit}
        validationSchema={LoginSchema}
      >
        {({ handleSubmit }) => (
          <View>
            {isSignUpForm && (
              <InputFormik fieldName="userName" label={resources.userName} />
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
            <Button
              onPress={(e: any) => handleSubmit(e)}
              title={resources.submit}
              type="outline"
              icon={<Icon type={iconSet.bell.type} name={iconSet.bell.name} />}
            />
            <Button
              onPress={() => setIsSignUpForm((prev) => !prev)}
              title={isSignUpForm ? resources.signUp : resources.signIn}
            />
            <Button onPress={logOut} title="Log out" />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default LoginForm;
