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
import { client, useQuery } from "../../utils/hooks/useApolloClient";
import { ImageProfile } from "../../assets";
import { ProfileValues } from "../../utils/helpers/validationSchema";
import { defaultCountryCode } from "../../utils/helpers/constants";
import { pickImageFromGallery } from "../../utils/helpers/pictureHelper";
import { GET_USER_BY_ID } from "../../utils/helpers/queries";
import { UserCard } from "../../utils/types/types";
import { getCloudinaryUrl } from "../../utils/helpers/cloudinaryHelper";

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
  const { loading, error, data } = useQuery(GET_USER_BY_ID);
  console.log(data);
  const userInformations: UserCard | undefined = data?.getUserById;

  // au chargement get user info
  // edit > update form values
  // save > post form values
  // get updated user info
  // TODO:
  // pb de type ur l
  // pb de nullable de avatarCloudinary coté back
  // brancher l'update avec le back
  // gérer le reset du formrulaire
  // style

  const { navigate } = useNavigation();
  const [isEditingProfile, setIsEditingProfile] = React.useState<boolean>(
    false
  );
  const [formValues, setFormValues] = React.useState<ProfileValues>({
    userName: userInformations?.name,
    phoneNumber: {
      value: userInformations?.phoneNumber || "",
      isValid: false,
      countryCode: defaultCountryCode
    },
    profilePictureCloudinaryId: userInformations?.avatarCloudinaryPublicId
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
      <ImageProfile
        url={
          userInformations?.avatarCloudinaryPublicId &&
          (getCloudinaryUrl(
            userInformations?.avatarCloudinaryPublicId
          ) as ImageURISource)
        }
      />
      <View style={styles.buttonContainer}>
        {!isEditingProfile && (
          <>
            <Text>{userInformations?.name}</Text>
            <Text>{userInformations?.phoneNumber}</Text>
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
                    <Text>{values?.profilePictureCloudinaryId}</Text>
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
