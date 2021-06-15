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
import { useNavigationContext } from "../../navigation/NavigationContext";
import { userIdConnected } from "../../utils/types/dumbData";
import { useMutation } from "../../utils/hooks/useApolloClient";
import { LOGIN } from "../../utils/helpers/mutation";
import { setAccessToken } from "../../utils/helpers/accessToken";

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
  const [login] = useMutation(LOGIN);

  const { navigate } = useNavigation();
  const { updateAccessToken, updateUserId } = useNavigationContext();

  // React.useEffect(() => {
  //   const getRefreshToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("@refreshToken");
  //       console.log("IS STORED ////// ", token);
  //       if (token !== null) {
  //         const response = await fetch(`${BASE_URL}/refresh_token/`, {
  //           method: "POST",
  //           headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //           body: `refreshToken=${token}`
  //         });
  //         const responseJson = await response.json();
  //         console.log("response", responseJson);
  //         if (responseJson.ok) {
  //           updateAccessToken(responseJson.accessToken);
  //           setAccessToken(responseJson.accessToken);
  //           // navigate("BottomNavigation");
  //           try {
  //             await AsyncStorage.setItem(
  //               "@refreshToken",
  //               responseJson.refreshToken
  //             );
  //           } catch (e) {
  //             console.log(e);
  //           }
  //         }
  //       }
  //     } catch (e) {}
  //   };
  //   getRefreshToken();
  // }, []);

  const handleSubmit = async (values: LoginInformation) => {
    const { password, phoneNumber } = values;
    const response = await login({ variables: { password, phoneNumber } });
    console.log("response ////////// ", response);
    if (response && response.data) {
      updateAccessToken(response.data.login.accessToken);
      setAccessToken(response.data.login.accessToken);
      navigate("BottomNavigation");
      try {
        await AsyncStorage.setItem(
          "@refreshToken",
          response.data.login.refreshToken
        );
      } catch (e) {
        console.log(e);
      }
    }
    updateUserId(userIdConnected);
  };

  const logOut = async () => {
    setAccessToken("");
    await AsyncStorage.setItem("@refreshToken", "");
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
