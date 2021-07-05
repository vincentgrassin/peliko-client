import React from "react";
import { useNavigation } from "../../utils/hooks/useNavigation";
import View from "../View";
import Text from "../Text";
import StyleSheet from "../StyleSheet";
import TouchableOpacity from "../TouchableOpacity";
import ThumbnailSvg, { ThumbnailSvgProps } from "../../assets/ThumbnailSvg";
import { shape } from "../../themeHelpers";
import RollBadge from "../RollBadge";
import Badge from "../Badge";

interface RollThumbnailProps extends ThumbnailSvgProps {
  rollName: string | undefined;
  pictureNumber: number | undefined;
  participantNumber: number | undefined;
  closingDate: string | undefined;
  hasBeenDiscovered: boolean;
  rollId: number | undefined;
}

const style = StyleSheet.create({
  root: { position: "relative" },
  thumbnailContent: {
    position: "absolute",
    top: "30%",
    marginLeft: shape.spacing(3)
  },
  badgeArea: {
    display: "flex",
    flexDirection: "row"
  }
});

const RollThumbnail: React.FC<RollThumbnailProps> = ({
  rollName,
  pictureNumber,
  participantNumber,
  closingDate,
  hasBeenDiscovered,
  backgroundColor,
  url,
  rollId,
  ...props
}) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={style.root}
      onPress={() => navigate("RollScreen", { backgroundColor, rollId })}
    >
      <View>
        <ThumbnailSvg backgroundColor={backgroundColor} url={url} {...props} />
        <View style={style.thumbnailContent}>
          <Text h1>{rollName}</Text>
          <View style={style.badgeArea}>
            <Badge
              value={<RollBadge value={pictureNumber} icon="pictureNumber" />}
            />
            <Badge
              value={
                <RollBadge value={participantNumber} icon="participantNumber" />
              }
            />
            <Badge value={<RollBadge value={closingDate} icon="date" />} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RollThumbnail;
