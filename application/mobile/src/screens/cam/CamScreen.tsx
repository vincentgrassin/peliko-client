import React from "react";
import { Camera } from "expo-camera";
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from "@env";
import { Button, Icon, StyleSheet, View } from "../../components";
import { resources, iconSet, shape } from "../../themeHelpers";
import { UPLOAD_PICTURE } from "../../utils/helpers/mutation";
import { useMutation } from "../../utils/hooks/useApolloClient";
import { RouteProp, useRoute } from "../../utils/hooks/useNavigation";
import { ParamList } from "../../navigation/NavigationContainer";
import { GET_ROLLS_BY_USER, GET_ROLL_BY_ID } from "../../utils/helpers/queries";

interface CamProps {}

const style = StyleSheet.create({
  actions: {
    marginTop: "auto"
  },
  cameraOptions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: shape.spacing(3)
  }
});

const Cam: React.FC<CamProps> = ({ ...props }) => {
  let camera = React.useRef(null);
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [isCameraBack, setIsCameraBack] = React.useState<boolean>(true);
  const [isFlashOn, setIsFlashOn] = React.useState<boolean>(false);
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const [uploadPicture, { data }] = useMutation(UPLOAD_PICTURE);
  const route = useRoute<RouteProp<ParamList, "RollScreen">>();
  const rollId = route?.params?.rollId;

  React.useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
      }
    };
    requestPermission();
  }, []);

  async function takePicture() {
    setIsVisibleModal(true);
    if (camera) {
      //@ts-ignore
      const picture = await camera.takePictureAsync({
        quality: 0.7,
        base64: true,
        exif: true
      });
      if (picture.base64) {
        const data = {
          file: `data:image/jpg;base64,${picture.base64}`,
          upload_preset: CLOUDINARY_UPLOAD_PRESET
        };
        const response = await fetch(CLOUDINARY_UPLOAD_URL, {
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json"
          },
          method: "POST"
        });
        const jsonResponse = await response.json();
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
      setIsVisibleModal(false);
    }
  }

  const toggleFlash = () => {
    setIsFlashOn(!isFlashOn);
  };

  const reverseCam = () => {
    setIsCameraBack((prev) => !prev);
  };

  return (
    <>
      {hasPermission && (
        <Camera
          style={{ flex: 1 }}
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
          <View style={style.actions}>
            <View style={style.cameraOptions}>
              <Icon
                name={iconSet.flash.name}
                type={iconSet.flash.type}
                onPress={toggleFlash}
              />
              <Icon
                name={iconSet.reverseCam.name}
                type={iconSet.reverseCam.type}
                onPress={reverseCam}
              />
            </View>
            <Button onPress={takePicture} title={resources.shootPicture} />
          </View>
        </Camera>
      )}
    </>
  );
};

export default Cam;
