import React, { ReactNode } from "react";
import Text from "../Text";
import View from "../View";
import Icon from "../Icon";
import { shape, iconSet } from "../../themeHelpers";
import StyleSheet from "../StyleSheet";

interface RollBadgeProps {
  value: ReactNode;
  secondaryValue?: ReactNode;
  icon?: "date" | "participantNumber" | "pictureNumber";
}

const style = StyleSheet.create({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  iconStyle: {
    marginRight: shape.spacing(0.5)
  }
});

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

  return (
    <View style={style.root}>
      {icon && iconComponent[icon] && (
        <Icon
          type={iconComponent[icon].type}
          name={iconComponent[icon].name}
          size={shape.spacing(2)}
          style={style.iconStyle}
        />
      )}
      <Text>{value}</Text>
      {secondaryValue && <Text> {secondaryValue}</Text>}
    </View>
  );
};
export default RollBadge;
