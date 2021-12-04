import React from "react";
import { makeStyles } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageURISource } from "react-native";
import { Formik } from "formik";

import {
  Button,
  InputFormik,
  NavigationHeader,
  PhoneNumberInputFormik,
  Text,
  View
} from "../../components";
import { useNavigation } from "../../utils/hooks/useNavigation";
import { ScreenList } from "../../navigation/NavigationContainer";
import { resources, palette, shape } from "../../themeHelpers";
import { client } from "../../utils/hooks/useApolloClient";
import { ImageProfile } from "../../assets";
import { ProfileValues } from "../../utils/helpers/validationSchema";
import { defaultCountryCode } from "../../utils/helpers/constants";
import { pickImageFromGallery } from "../../utils/helpers/pictureHelper";

interface ParametersProps {}

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1
  },
  button: {
    width: "75%",
    marginTop: shape.spacing(3)
  },
  buttonContainer: {
    marginTop: shape.spacing(3),
    alignItems: "center"
  },
  inputArea: {
    width: "100%"
  }
}));

const Parameters: React.FC<ParametersProps> = ({ ...props }) => {
  const styles = useStyles();

  const url =
    "https://cdn.radiofrance.fr/s3/cruiser-production/2021/08/44f71fe7-5732-4515-a2f3-02d14f302380/1136_rapport-liens-nature-societe.jpg";

  // au chargement get user info
  // edit > update form values
  // save > post form values
  // get updated user info

  const { navigate } = useNavigation();
  const [isEditingProfile, setIsEditingProfile] = React.useState<boolean>(
    false
  );
  const [formValues, setFormValues] = React.useState<ProfileValues>({
    userName: "",
    phoneNumber: { value: "", isValid: false, countryCode: defaultCountryCode },
    profilePicture: {
      cloudinaryId: ""
    }
  });

  const handleLogOut = async () => {
    await AsyncStorage.setItem("@accessToken", "");
    await AsyncStorage.setItem("@refreshToken", "");
    client.cache.reset();
    navigate<ScreenList>("Login");
  };

  const openProfileUpdater = () => {
    setIsEditingProfile(true);
  };

  const saveProfile = async (values: ProfileValues) => {
    console.log(values);
    setIsEditingProfile(false);
  };

  return (
    <View style={styles.container}>
      <NavigationHeader
        color={palette("yellow")}
        screen="BottomNavigation"
        text={resources.myProfile}
      />
      <ImageProfile url={url as ImageURISource} />
      <View style={styles.buttonContainer}>
        {!isEditingProfile && (
          <>
            <Button
              onPress={openProfileUpdater}
              containerStyle={styles.button}
              title={resources.updateProfile}
              disabled={isEditingProfile}
              type="outline"
            />
          </>
        )}
        {isEditingProfile && (
          <>
            <Formik
              initialValues={formValues}
              onSubmit={saveProfile}
              // validationSchema={loginSchema}
              enableReinitialize
            >
              {({ handleSubmit, setFieldValue, values }) => (
                <View style={styles.inputArea}>
                  <Button
                    onPress={(e: any) => handleSubmit(e)}
                    containerStyle={styles.button}
                    title={resources.saveProfile}
                    type="outline"
                  />
                  <InputFormik
                    fieldName="userName"
                    label={resources.userName}
                  />
                  <PhoneNumberInputFormik fieldName="phoneNumber" />
                  <>
                    <Button
                      onPress={async () =>
                        setFieldValue(
                          "profilePicture",
                          await pickImageFromGallery()
                        )
                      }
                      containerStyle={styles.button}
                      title={resources.pickProfilePicture}
                      type="outline"
                    />
                    <Text>{values?.profilePicture?.cloudinaryId}</Text>
                  </>
                </View>
              )}
            </Formik>
          </>
        )}
        <Button
          onPress={handleLogOut}
          containerStyle={styles.button}
          title={resources.logOut}
          type="outline"
        />
      </View>
    </View>
  );
};

export default Parameters;
