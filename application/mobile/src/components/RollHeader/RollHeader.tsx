import * as React from "react";
import { useRoute, RouteProp } from "../../utils/hooks/useNavigation";
import Text from "../Text";
import View from "../View";
import StyleSheet from "../StyleSheet";
import { resources, shape } from "../../themeHelpers";
import HeaderRollSvg from "../../assets/HeaderRollSvg";
import { ParamList } from "../../navigation/NavigationContainer";
import RollBadge from "../RollBadge";
import Badge from "../Badge";

interface RollHeaderProps {
  name: string | undefined;
  description: string | undefined;
  closingDate: string | undefined;
  remainingPictures: number | undefined;
}

const style = StyleSheet.create({
  root: { position: "relative" },
  rollHeaderContent: {
    position: "absolute",
    top: "30%",
    marginLeft: shape.spacing(3)
  }
});

const RollHeader: React.FC<RollHeaderProps> = ({
  name,
  description,
  closingDate,
  remainingPictures,
  ...props
}) => {
  const route = useRoute<RouteProp<ParamList, "RollScreen">>();

  return (
    <View style={style.root}>
      <HeaderRollSvg backgroundColor={route?.params?.backgroundColor} />
      <View style={style.rollHeaderContent}>
        <Text>{name}</Text>
        <Text>{description}</Text>
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
  );
};

export default RollHeader;
