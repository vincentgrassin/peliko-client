import React from "react";
import Text from "../Text";
import StyleSheet from "../StyleSheet";
import RollThumbnail from "../RollThumbnail";
import ScrollView from "../ScrollView";
import { RollData } from "../../utils/types/types";
import { getThumbnailRollColor } from "../../utils/helpers/colorHelper";
import { openRollsList } from "../../utils/types/dumbData";
import { GET_ROLLS } from "../../utils/helpers/queries";
import { useQuery } from "../../utils/hooks/useApolloClient";

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

  const { loading, error, data } = useQuery(GET_ROLLS);
  console.log({ data, loading, error });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Oh no... {error.message}</Text>;

  return (
    <ScrollView style={style.tabContent}>
      <Text>{isOpenRollTab ? "open" : "closed"}</Text>
      {rollList &&
        rollList.map((roll, index) => (
          <RollThumbnail
            key={index}
            backgroundColor={getThumbnailRollColor(index)}
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
