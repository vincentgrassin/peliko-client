import React from "react";
import Button from "../Button";
import View from "../View";
import StyleSheet from "../StyleSheet";
import { resources } from "../../themeHelpers/index";

interface TabsHeaderProps {
  isOpenRollTabActive: boolean;
  handlePress: () => void;
}

const TabsHeader: React.FC<TabsHeaderProps> = ({
  isOpenRollTabActive,
  handlePress
}) => {
  return (
    <View style={style.tabsHeader}>
      <Button
        title={resources.rollTabName}
        onPress={handlePress}
        disabled={isOpenRollTabActive}
      />
      <Button
        title={resources.notificationTabName}
        onPress={handlePress}
        disabled={!isOpenRollTabActive}
      />
    </View>
  );
};

export default TabsHeader;

const style = StyleSheet.create({
  tabsHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});
