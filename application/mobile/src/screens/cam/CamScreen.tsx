import * as React from "react";
import { Camera } from "expo-camera";
import { makeStyles } from "react-native-elements";
import { Button, Icon, View, NavigationHeader } from "../../components";
import { resources, iconSet, shape, palette } from "../../themeHelpers";
import { UPLOAD_PICTURE } from "../../utils/helpers/mutation";
import { useMutation } from "../../utils/hooks/useApolloClient";
import { RouteProp, useRoute } from "../../utils/hooks/useNavigation";
import { ParamList } from "../../navigation/NavigationContainer";
import { GET_ROLLS_BY_USER, GET_ROLL_BY_ID } from "../../utils/helpers/queries";
import Modal from "../../components/Modal";
import { useModal } from "../../utils/hooks/useModal";
import { uploadToCloudinary } from "../../utils/helpers/cloudinaryHelper";
import { useHandleQueryError } from "../../utils/hooks/useHandleQueryError";

interface CamProps {}

const useStyles = makeStyles(() => ({
  actions: {
    marginTop: "auto"
  },
  cameraOptions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: shape.spacing(3)
  }
}));

const Cam: React.FC<CamProps> = ({}) => {
  const styles = useStyles();
  let camera = React.useRef(null);
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [isCameraBack, setIsCameraBack] = React.useState<boolean>(true);
  const [isFlashOn, setIsFlashOn] = React.useState<boolean>(false);
  const { handleError } = useHandleQueryError();
  const [uploadPicture] = useMutation(UPLOAD_PICTURE, { onError: handleError });
  const route = useRoute<RouteProp<ParamList, "RollScreen">>();
  const rollId = route?.params?.rollId;
  const { openModal, closeModal, isOpen: isVisibleModal } = useModal();

  React.useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
      }
    };
    requestPermission();
  }, []);

  const takePicture = async () => {
    openModal();
    if (camera) {
      //@ts-ignore
      const picture = await camera.takePictureAsync({
        quality: 0.7,
        base64: true,
        exif: true
      });
      if (picture.base64) {
        const jsonResponse = await uploadToCloudinary(picture.base64);
        uploadPicture({
          variables: {
            cloudinaryId: jsonResponse.public_id,
            height: jsonResponse.height,
            width: jsonResponse.width,
            rollId
          },
          awaitRefetchQueries: true,
          refetchQueries: [
            { query: GET_ROLL_BY_ID, variables: { id: rollId } },
            { query: GET_ROLLS_BY_USER, variables: { isOpenTab: true } }
          ]
        });
      }
      closeModal();
    }
  };

  const toggleFlash = () => {
    setIsFlashOn(!isFlashOn);
  };

  const reverseCam = () => {
    setIsCameraBack((prev) => !prev);
  };

  return (
    <>
      {hasPermission && (
        <>
          <NavigationHeader
            color={palette("blue")}
            screen="RollScreen"
            text={resources.roll}
          />
          <Camera
            style={{ flex: 1 }}
            ratio="16:9"
            type={
              isCameraBack
                ? Camera.Constants.Type.back
                : Camera.Constants.Type.front
            }
            flashMode={
              isFlashOn
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
            }
            //@ts-ignore
            ref={(ref) => (camera = ref)}
          >
            <View style={styles.actions}>
              <View style={styles.cameraOptions}>
                <Icon {...iconSet.flash} onPress={toggleFlash} />
                <Icon {...iconSet.reverseCam} onPress={reverseCam} />
              </View>
              <Button onPress={takePicture} title={resources.shootPicture} />
            </View>
          </Camera>
          <Modal
            isVisible={isVisibleModal}
            image="eye"
            color={palette("blue")}
            modalType="loading"
            text={resources.processingPicture}
          />
        </>
      )}
    </>
  );
};

export default Cam;
