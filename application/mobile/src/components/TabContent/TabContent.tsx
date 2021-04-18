import React from "react";
import View from "../View";
import Text from "../Text";
import StyleSheet from "../StyleSheet";
import RollThumbnail from "../RollThumbnail";
import ScrollView from "../ScrollView";
import { palette } from "../../themeHelpers";
import { RollData } from "../../utils/types/types";
import { openRollsList } from "../../utils/types/dumbData";

interface TabContentProps {
  isOpenRollTab: boolean;
}

const style = StyleSheet.create({
  tabContent: {
    flex: 1
  }
});

const TabContent: React.FC<TabContentProps> = ({ isOpenRollTab }) => {
  const [rollList, setRollList] = React.useState<RollData[]>([]);

  React.useEffect(() => {
    // should be replaced by useFetch hook
    const doFetch = async () => {
      setRollList(openRollsList);
    };
    doFetch();
  }, []);

  return (
    <ScrollView style={style.tabContent}>
      <Text>{isOpenRollTab ? "open" : "closed"}</Text>
      {rollList &&
        rollList.map((roll, key) => (
          <RollThumbnail
            key={key}
            backgroundColor={palette("red")}
            rollName={roll?.name}
            pictureNumber={roll?.pictureNumber}
            participantNumber={roll?.participants?.length}
            closingDate={roll?.closingDate}
            hasBeenDiscovered={false}
          />
        ))}
    </ScrollView>
  );
};

export default TabContent;
