import * as React from "react";
import { makeStyles } from "react-native-elements";
import { ImageSourcePropType } from "react-native";
import { useNavigation } from "../../utils/hooks/useNavigation";
import View from "../View";
import Text from "../Text";
import TouchableOpacity from "../TouchableOpacity";
import { Thumbnail, ThumbnailSvgProps } from "../../assets";
import { shape } from "../../themeHelpers";
import RollBadge from "../RollBadge";
import Badge from "../Badge";
import { getRemainingTimeOnDate } from "../../utils/helpers/dateHelper";
import { ScreenList } from "../../navigation/NavigationContainer";
import { getCloudinaryUrl } from "../../utils/helpers/cloudinaryHelper";

interface RollThumbnailProps extends ThumbnailSvgProps {
  rollName: string;
  pictureNumber: number;
  participantNumber: number;
  closingDate: string;
  hasBeenDiscovered: boolean;
  rollId: number;
  isOpenRoll: boolean;
  coverPictureId?: string;
}

const useStyles = makeStyles(() => ({
  root: { position: "relative" },
  thumbnailContent: {
    position: "absolute",
    top: "30%",
    marginLeft: shape.spacing(3),
  },
  badgeArea: {
    display: "flex",
    flexDirection: "row",
    marginTop: shape.spacing(2),
  },
  badge: {
    marginRight: shape.spacing(1),
  },
}));

const RollThumbnail: React.FC<RollThumbnailProps> = ({
  rollName,
  pictureNumber,
  participantNumber,
  closingDate,
  backgroundColor,
  rollId,
  isOpenRoll,
  coverPictureId,
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
          isOpenRoll,
        })
      }
    >
      <View>
        <Thumbnail
          backgroundColor={backgroundColor}
          url={
            !isOpenRoll && coverPictureId
              ? (getCloudinaryUrl(coverPictureId) as ImageSourcePropType)
              : undefined
          }
          {...props}
        />
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
            {isOpenRoll && (
              <Badge
                value={
                  <RollBadge
                    value={remainingTime?.value}
                    secondaryValue={remainingTime?.text}
                    icon="date"
                  />
                }
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RollThumbnail;
