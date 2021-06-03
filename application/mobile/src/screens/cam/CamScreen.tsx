import React from "react";
import { Camera } from "expo-camera";
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from "@env";
import { Button } from "../../components";
import { resources } from "../../themeHelpers";
import { UPLOAD_PICTURE } from "../../utils/helpers/mutation";
import { useMutation } from "../../utils/hooks/useApolloClient";
import { useNavigationContext } from "../../navigation/NavigationContext";

interface CamProps {}

const Cam: React.FC<CamProps> = ({ ...props }) => {
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [flash, setFlash] = React.useState(Camera.Constants.FlashMode.off);
  let camera = React.useRef(null);
  const [toggleFlashState, setToggleFlashState] = React.useState(true);
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const [uploadPicture, { data }] = useMutation(UPLOAD_PICTURE);
  const { userId } = useNavigationContext();

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
      }
    })();
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
      console.log("Picture is taken", picture.width, picture.height);
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
          variables: { cloudinaryId: jsonResponse.public_id, userId, rollId: 3 }
        });
      }
      setIsVisibleModal(false);
    }
  }

  return (
    <>
      {hasPermission && (
        <Camera
          style={{ flex: 1 }}
          type={type}
          flashMode={flash}
          //@ts-ignore
          ref={(ref) => (camera = ref)}
        >
          <Button onPress={takePicture} title={resources.shootPicture} />
        </Camera>
      )}
    </>
  );
};

export default Cam;
