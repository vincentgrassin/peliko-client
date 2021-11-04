import * as React from "react";
import { makeStyles } from "react-native-elements";
import { ActivityIndicator, Modal as RNModal } from "react-native";
import { screenHeight, screenWidth } from "../../utils/helpers/constants";
import View from "../View";
import Text from "../Text";
import Eye from "../../assets/Eye";
import { palette } from "../../themeHelpers";

interface ModalProps {
  image?: ImageModal;
  text?: string;
  isVisible: boolean;
  color: string;
  modalType?: ModalType;
}
type ModalType = "loading";
type ImageModal = "eye";

const useStyles = makeStyles((theme, styleProps: { color: string }) => {
  const { color } = styleProps;

  return {
    modal: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: screenHeight,
      width: screenWidth,
      backgroundColor: color
    }
  };
});

const Modal: React.FC<ModalProps> = ({
  image,
  text,
  isVisible,
  color,
  modalType
}) => {
  const styles = useStyles({ color });

  const imageModalMapping: { [key: string]: JSX.Element } = {
    eye: <Eye />
  };

  return (
    <RNModal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modal}>
        {image && imageModalMapping[image]}
        {text && <Text h2>{text}</Text>}
        {modalType === "loading" && (
          <ActivityIndicator size="large" color={palette("black")} />
        )}
      </View>
    </RNModal>
  );
};

export default Modal;
