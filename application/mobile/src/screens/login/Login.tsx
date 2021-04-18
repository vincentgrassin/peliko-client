import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  View,
  StyleSheet,
  Button,
  ScrollView,
  InputFormik
} from "../../components";
import { resources } from "../../themeHelpers";
import useNavigation from "../../utils/hooks/useNavigation";

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

  const { navigate } = useNavigation();

  const handleSubmit = (values: LoginInformation) => {
    console.log("login data : ", values);
    navigate("BottomNavigation");
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
            />
            <Button
              onPress={() => setIsSignUpForm((prev) => !prev)}
              title={isSignUpForm ? resources.signUp : resources.signIn}
            />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default LoginForm;
