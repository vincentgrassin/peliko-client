import * as React from "react";
import { makeStyles } from "react-native-elements";
import { ActivityIndicator, Modal as RNModal } from "react-native";
import {
  screenHeight,
  screenWidth,
  svgMapping
} from "../../utils/helpers/constants";
import View from "../View";
import Text from "../Text";
import { palette } from "../../themeHelpers";
import { SvgType } from "../../utils/types/types";

interface ModalProps {
  image?: SvgType;
  text?: string;
  isVisible: boolean;
  color: string;
  modalType?: ModalType;
}
type ModalType = "loading";

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

  return (
    <RNModal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modal}>
        {image && svgMapping[image]}
        {text && <Text h2>{text}</Text>}
        {modalType === "loading" && (
          <ActivityIndicator size="large" color={palette("black")} />
        )}
      </View>
    </RNModal>
  );
};

export default Modal;
