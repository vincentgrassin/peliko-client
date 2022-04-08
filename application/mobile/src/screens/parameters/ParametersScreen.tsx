import * as React from "react";
import { makeStyles } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageSourcePropType } from "react-native";
import { Formik } from "formik";
import {
  Button,
  InputFormik,
  Loader,
  NavigationHeader,
  PhoneNumberInputFormik,
  Text,
  View,
} from "../../components";
import { useNavigation } from "../../utils/hooks/useNavigation";
import { ScreenList } from "../../navigation/NavigationContainer";
import { resources, palette, shape } from "../../themeHelpers";
import {
  client,
  useMutation,
  useQuery,
} from "../../utils/hooks/useApolloClient";
import { ImageProfile } from "../../assets";
import {
  ProfileValues,
  userProfileSchema,
} from "../../utils/helpers/validationSchema";
import { defaultCountryCode } from "../../utils/helpers/constants";
import { pickImageFromGallery } from "../../utils/helpers/pictureHelper";
import { GET_USER_BY_ID } from "../../utils/helpers/queries";
import { UserCard } from "../../utils/types/types";
import {
  getCloudinaryUrl,
  uploadToCloudinary,
} from "../../utils/helpers/cloudinaryHelper";
import { UPDATE_USER } from "../../utils/helpers/mutation";
import { useHandleServerError } from "../../utils/hooks/useHandleServerError";
import InputWrapper from "../../components/InputWrapper";

interface ParametersProps {}

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flex: 1,
  },
  button: {
    width: "75%",
  },
  userInformation: {
    marginTop: shape.spacing(3),
    alignItems: "center",
  },
  inputArea: {
    width: "80%",
    marginTop: shape.spacing(3),
  },
  profilePicturePicker: {
    position: "absolute",
    top: shape.spacing(4),
    right: shape.spacing(1),
  },
  logOut: {
    marginTop: "auto",
    marginBottom: shape.spacing(8),
    alignSelf: "center",
  },
  userDetail: {
    marginTop: 30,
  },
  cancelButton: {
    marginTop: shape.spacing(2),
  },
}));

const Parameters: React.FC<ParametersProps> = ({}) => {
  const styles = useStyles();
  const { handleError, errorMessage, updateErrorMessage } =
    useHandleServerError();
  const { data } = useQuery(GET_USER_BY_ID, { onError: handleError });
  const [updateUser] = useMutation(UPDATE_USER, {
    onError: handleError,
    errorPolicy: "all",
  });

  const userInformations: UserCard | undefined = data?.getUserById;

  const { navigate } = useNavigation();
  const [isEditingProfile, setIsEditingProfile] =
    React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [profilePicture, setProfilePicture] = React.useState<{
    base64: string | undefined;
    uri: string;
  }>({
    base64: "",
    uri: "",
  });
  const [formValues, setFormValues] = React.useState<ProfileValues>({
    userName: userInformations?.name,
    phoneNumber: {
      value: userInformations?.phoneNumber || "",
    },
    profilePictureCloudinaryId: userInformations?.avatarCloudinaryPublicId,
  });

  React.useEffect(() => {
    if (userInformations?.avatarCloudinaryPublicId) {
      setProfilePicture((prevState) => {
        return {
          ...prevState,
          uri: userInformations.avatarCloudinaryPublicId
            ? getCloudinaryUrl(userInformations.avatarCloudinaryPublicId)
            : "",
        };
      });
    }
    setFormValues({
      userName: userInformations?.name,
      phoneNumber: {
        value: userInformations?.phoneNumber || "",
      },
      profilePictureCloudinaryId: userInformations?.avatarCloudinaryPublicId,
    });
  }, [userInformations]);

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
    const { phoneNumber, userName } = values;
    let pictureServerResponse;
    setLoading(true);
    if (profilePicture.base64) {
      pictureServerResponse = await uploadToCloudinary(profilePicture.base64);
    }
    const response = await updateUser({
      variables: {
        phoneNumber: phoneNumber?.value,
        name: userName,
        profilePicture:
          pictureServerResponse?.public_id ||
          userInformations?.avatarCloudinaryPublicId ||
          "",
      },
      update(cache, { data }) {
        cache.writeQuery({
          query: GET_USER_BY_ID,
          data: {
            getUserById: data?.updateUser || userInformations,
          },
        });
      },
    });
    if (response.errors) {
      updateErrorMessage(response.errors);
    }
    setLoading(false);
    setIsEditingProfile(false);
  };

  return (
    <View style={styles.container}>
      <NavigationHeader
        color={palette("yellow")}
        screen="BottomNavigation"
        text={resources.myProfile}
      />
      <View>
        {profilePicture?.uri ? (
          <ImageProfile url={profilePicture.uri as ImageSourcePropType} />
        ) : (
          <ImageProfile backgroundColor={palette("yellow")} />
        )}
        {isEditingProfile && (
          <Button
            onPress={async () => {
              const picture = await pickImageFromGallery();
              picture && setProfilePicture(picture);
            }}
            type="outline"
            containerStyle={styles.profilePicturePicker}
            title={resources.pickProfilePicture}
          />
        )}
      </View>
      {loading && <Loader />}
      <Text isError>{!!errorMessage && errorMessage}</Text>
      <View style={styles.userInformation}>
        {!isEditingProfile && (
          <>
            <Button
              onPress={openProfileUpdater}
              containerStyle={styles.button}
              title={resources.updateProfile}
              disabled={isEditingProfile}
            />
            <Text h3 style={styles.userDetail}>
              {resources.userName} {userInformations?.name}
            </Text>
            <Text h3 style={styles.userDetail}>
              {resources.phoneNumber} {userInformations?.phoneNumber}
            </Text>
          </>
        )}
        {isEditingProfile && (
          <>
            <Formik
              initialValues={formValues}
              onSubmit={saveProfile}
              validationSchema={userProfileSchema}
              enableReinitialize
            >
              {({ handleSubmit }) => (
                <>
                  <Button
                    onPress={(e: any) => {
                      handleSubmit(e);
                    }}
                    containerStyle={styles.button}
                    title={resources.saveProfile}
                  />
                  <View style={styles.inputArea}>
                    <InputWrapper>
                      <InputFormik
                        fieldName="userName"
                        label={resources.userName}
                      />
                    </InputWrapper>
                    <InputWrapper hasStartAdornment>
                      <PhoneNumberInputFormik
                        fieldName="phoneNumber"
                        label={resources.phoneNumber}
                      />
                    </InputWrapper>
                  </View>
                  <Button
                    onPress={() => setIsEditingProfile(false)}
                    containerStyle={{
                      ...styles.button,
                      ...styles.cancelButton,
                    }}
                    title={resources.cancel}
                    type="outline"
                  />
                </>
              )}
            </Formik>
          </>
        )}
      </View>
      <Button
        onPress={handleLogOut}
        containerStyle={{ ...styles.button, ...styles.logOut }}
        title={resources.logOut}
      />
    </View>
  );
};

export default Parameters;
