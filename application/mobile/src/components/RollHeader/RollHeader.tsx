import * as React from "react";
import { makeStyles } from "react-native-elements";
import { useRoute, RouteProp } from "../../utils/hooks/useNavigation";
import Text from "../Text";
import View from "../View";
import { resources, shape } from "../../themeHelpers";
import { HeaderRoll } from "../../assets";
import { ParamList } from "../../navigation/NavigationContainer";
import RollBadge from "../RollBadge";
import Badge from "../Badge";
import { getRemainingTimeOnDate } from "../../utils/helpers/dateHelper";

interface RollHeaderProps {
  name: string | undefined;
  description: string | undefined;
  closingDate: string | undefined;
  remainingPictures: number | undefined;
}

const useStyles = makeStyles((theme, color: string) => ({
  rollHeaderContent: {
    padding: shape.spacing(2),
    backgroundColor: color
  },
  description: {
    marginTop: shape.spacing(1),
    marginBottom: shape.spacing(1)
  },
  badges: {
    display: "flex",
    flexDirection: "row",
    padding: shape.spacing(2),
    justifyContent: "space-between",
    width: "100%"
  },
  rollText: {
    paddingLeft: shape.spacing(2)
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
  const styles = useStyles(route?.params?.backgroundColor);

  const remainingTime = getRemainingTimeOnDate(closingDate, false);

  return (
    <>
      <View style={styles.rollHeaderContent}>
        <View style={styles.rollText}>
          <Text h1>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <View style={styles.badges}>
          {remainingTime && (
            <Badge
              value={
                <RollBadge
                  value={remainingTime.value}
                  secondaryValue={remainingTime.text}
                />
              }
            />
          )}
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
      <HeaderRoll backgroundColor={route?.params?.backgroundColor} />
    </>
  );
};

export default RollHeader;
