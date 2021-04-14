import React from "react";
import View from "../View";
import Text from "../Text";
import StyleSheet from "../StyleSheet";

interface TabContentProps {
  isOpenRollTab: boolean;
}

const style = StyleSheet.create({
  tabContent: {
    flex: 1
  }
});

const TabContent: React.FC<TabContentProps> = ({ isOpenRollTab }) => {
  return (
    <View style={style.tabContent}>
      <Text>{isOpenRollTab ? "open" : "closed"}</Text>
    </View>
  );
};

export default TabContent;
