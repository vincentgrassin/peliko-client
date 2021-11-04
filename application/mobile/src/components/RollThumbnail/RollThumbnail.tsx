import React from "react";
import { makeStyles } from "react-native-elements";
import { useNavigation } from "../../utils/hooks/useNavigation";
import View from "../View";
import Text from "../Text";
import TouchableOpacity from "../TouchableOpacity";
import ThumbnailSvg, { ThumbnailSvgProps } from "../../assets/ThumbnailSvg";
import { shape } from "../../themeHelpers";
import RollBadge from "../RollBadge";
import Badge from "../Badge";
import { getRemainingTimeOnDate } from "../../utils/helpers/dateHelper";
import { ScreenList } from "../../navigation/NavigationContainer";

interface RollThumbnailProps extends ThumbnailSvgProps {
  rollName: string | undefined;
  pictureNumber: number | undefined;
  participantNumber: number | undefined;
  closingDate: string | undefined;
  hasBeenDiscovered: boolean;
  rollId: number | undefined;
  isOpenRoll: boolean;
}

const useStyles = makeStyles((theme) => ({
  root: { position: "relative" },
  thumbnailContent: {
    position: "absolute",
    top: "30%",
    marginLeft: shape.spacing(3)
  },
  badgeArea: {
    display: "flex",
    flexDirection: "row",
    marginTop: shape.spacing(2)
  },
  badge: {
    marginRight: shape.spacing(1)
  }
}));

const RollThumbnail: React.FC<RollThumbnailProps> = ({
  rollName,
  pictureNumber,
  participantNumber,
  closingDate,
  hasBeenDiscovered,
  backgroundColor,
  url,
  rollId,
  isOpenRoll,
  ...props
}) => {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const remainingTime = getRemainingTimeOnDate(closingDate, true);

  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() =>
        navigate<ScreenList>("RollScreen", {
          backgroundColor,
          rollId,
          isOpenRoll
        })
      }
    >
      <View>
        <ThumbnailSvg backgroundColor={backgroundColor} url={url} {...props} />
        <View style={styles.thumbnailContent}>
          <Text h1>{rollName}</Text>
          <View style={styles.badgeArea}>
            <Badge
              value={<RollBadge value={pictureNumber} icon="pictureNumber" />}
              containerStyle={styles.badge}
            />
            <Badge
              value={
                <RollBadge value={participantNumber} icon="participantNumber" />
              }
              containerStyle={styles.badge}
            />
            <Badge
              value={
                <RollBadge
                  value={remainingTime?.value}
                  secondaryValue={remainingTime?.text}
                  icon="date"
                />
              }
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RollThumbnail;
