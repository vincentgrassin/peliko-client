import React from "react";
import useNavigation from "../../utils/hooks/useNavigation";
import View from "../View";
import Text from "../Text";
import StyleSheet from "../StyleSheet";
import TouchableOpacity from "../TouchableOpacity";
import ThumbnailSvg, { ThumbnailSvgProps } from "../../assets/ThumbnailSvg";
import { palette, shape } from "../../themeHelpers";
import RollBadge from "../RollBadge";
import Badge from "../Badge";

interface RollThumbnailProps extends ThumbnailSvgProps {
  rollName: string | undefined;
  pictureNumber: number | undefined;
  participantNumber: number | undefined;
  closingDate: string | undefined;
  hasBeenDiscovered: boolean;
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
    flexDirection: "row",
    alignItems: "stretch"
  },
  badge: {
    backgroundColor: palette("white", 0.4),
    borderWidth: 0,
    paddingLeft: shape.spacing(1),
    paddingRight: shape.spacing(1),
    height: shape.spacing(3)
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
  ...props
}) => {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      style={style.root}
      onPress={() => navigate("RollContainer")}
    >
      <View>
        <ThumbnailSvg backgroundColor={backgroundColor} url={url} {...props} />
        <View style={style.thumbnailContent}>
          <Text>{rollName}</Text>
          <View style={style.badgeArea}>
            <Badge
              value={<RollBadge value={pictureNumber} icon="pictureNumber" />}
              badgeStyle={style.badge}
            />
            <Badge
              value={
                <RollBadge value={participantNumber} icon="participantNumber" />
              }
              badgeStyle={style.badge}
            />
            <Badge
              value={<RollBadge value={closingDate} icon="date" />}
              badgeStyle={style.badge}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RollThumbnail;
