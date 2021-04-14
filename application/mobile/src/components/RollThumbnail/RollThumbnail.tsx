import React from "react";
import useNavigation from "../../utils/hooks/useNavigation";
import View from "../View";
import Text from "../Text";
import StyleSheet from "../StyleSheet";
import TouchableOpacity from "../TouchableOpacity";
import ThumbnailSvg, { ThumbnailSvgProps } from "../../assets/ThumbnailSvg";

interface RollThumbnailProps extends ThumbnailSvgProps {
  name: string | undefined;
}

const style = StyleSheet.create({
  root: {}
});

const RollThumbnail: React.FC<RollThumbnailProps> = ({ name, ...props }) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigate("RollContainer")}>
      <View>
        <ThumbnailSvg {...props} />
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RollThumbnail;
