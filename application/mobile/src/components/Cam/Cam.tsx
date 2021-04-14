import * as React from "react";
import { Camera } from "expo-camera";
import Text from "../Text";

interface CamProps {}

const Cam: React.FC<CamProps> = ({ ...props }) => {
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const [flash, setFlash] = React.useState(Camera.Constants.FlashMode.off);
  // const camera = React.useRef(null);
  const [toggleFlashState, setToggleFlashState] = React.useState(true);
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
      }
    })();
  }, []);

  // async function takePicture() {
  //   // setIsVisibleModal(true);
  //   // if (camera) {
  //   //   const photo = await camera.takePictureAsync({
  //   //     quality: 0.7,
  //   //     base64: true,
  //   //     exif: true
  //   //   });
  //     // console.log("Picture is taken", photo.width, photo.height);
  //     // setIsVisibleModal(false);
  //   }
  // }

  return (
    <>
      {hasPermission && (
        <Camera
          style={{ flex: 1 }}
          type={type}
          flashMode={flash}
          // ref={(ref) => (camera = ref)}
        />
      )}
    </>
  );
};

export default Cam;
