import React from "react";
import View from "../View";
import Text from "../Text";

interface TabContentProps {
  isOpenRollTab: boolean;
}

const TabContent: React.FC<TabContentProps> = ({ isOpenRollTab }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>{isOpenRollTab ? "open" : "closed"}</Text>
    </View>
  );
};

export default TabContent;
