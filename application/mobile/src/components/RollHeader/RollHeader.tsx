import * as React from "react";
import { makeStyles } from "react-native-elements";
import { useRoute, RouteProp } from "../../utils/hooks/useNavigation";
import Text from "../Text";
import View from "../View";
import { resources, shape } from "../../themeHelpers";
import HeaderRollSvg from "../../assets/HeaderRollSvg";
import { ParamList } from "../../navigation/NavigationContainer";
import RollBadge from "../RollBadge";
import Badge from "../Badge";
import { getRemainingTimeOnDate } from "../../utils/helpers/dateHelper";

interface RollHeaderProps {
  name: string | undefined;
  description: string | undefined;
  closingDate: string;
  remainingPictures: number | undefined;
}

const useStyles = makeStyles((theme) => ({
  root: { position: "relative" },
  rollHeaderContent: {
    position: "absolute",
    top: 0,
    padding: shape.spacing(2)
  },
  description: {
    marginTop: shape.spacing(1),
    marginBottom: shape.spacing(1)
  },
  badges: {
    display: "flex",
    flexDirection: "row"
  }
}));

const RollHeader: React.FC<RollHeaderProps> = ({
  name,
  description,
  closingDate,
  remainingPictures,
  ...props
}) => {
  const route = useRoute<RouteProp<ParamList, "RollScreen">>();
  const styles = useStyles();

  // let time;
  // if (closingDate) {
  //   time = getRemainingTimeOnDate(closingDate, true);
  // }
  // console.log(time)
  const remainingTime = getRemainingTimeOnDate(closingDate, true);
  console.log(remainingTime);

  return (
    <View style={styles.root}>
      <HeaderRollSvg backgroundColor={route?.params?.backgroundColor} />
      <View style={styles.rollHeaderContent}>
        <Text h2>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.badges}>
          <Badge
            value={
              <RollBadge
                value={closingDate}
                secondaryValue={resources.remainingDays}
              />
            }
          />
          <Badge
            value={
              <RollBadge
                value={remainingPictures}
                secondaryValue={resources.remaningPictures}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default RollHeader;
