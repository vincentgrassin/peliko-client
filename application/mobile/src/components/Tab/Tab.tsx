import React from "react";
import GestureRecognizer from "react-native-swipe-gestures";
import View from "../View";
import Text from "../Text";

interface TabProps {
  onSwipeRight?: () => void | false;
  onSwipeLeft?: () => void;
  isOpenRollTab: boolean;
}

const Tab: React.FC<TabProps> = ({
  onSwipeRight,
  onSwipeLeft,
  isOpenRollTab
}) => {
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };

  return (
    <GestureRecognizer
      config={config}
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
    >
      <View style={{ height: "50%", backgroundColor: "green" }}>
        <Text>{isOpenRollTab ? "tab0" : "tab1"} </Text>
      </View>
    </GestureRecognizer>
  );
};

export default Tab;
