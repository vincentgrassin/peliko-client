import * as React from "react";
import { makeStyles } from "react-native-elements";
import Text from "../Text";
import View from "../View";
import Icon from "../Icon";
import { shape, iconSet } from "../../themeHelpers";

interface RollBadgeProps {
  value: React.ReactNode;
  secondaryValue?: React.ReactNode;
  icon?: "date" | "participantNumber" | "pictureNumber";
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  iconStyle: {
    marginRight: shape.spacing(0.5)
  }
}));

const RollBadge: React.FC<RollBadgeProps> = ({
  value,
  icon,
  secondaryValue
}) => {
  const iconComponent = {
    date: iconSet.calendar,
    pictureNumber: iconSet.picture,
    participantNumber: iconSet.people
  };
  const styles = useStyles();

  return (
    <View style={styles.root}>
      {icon && iconComponent[icon] && (
        <Icon
          type={iconComponent[icon].type}
          name={iconComponent[icon].name}
          size={shape.spacing(2)}
          style={styles.iconStyle}
        />
      )}
      <Text>{value}</Text>
      {secondaryValue && <Text> {secondaryValue}</Text>}
    </View>
  );
};
export default RollBadge;
