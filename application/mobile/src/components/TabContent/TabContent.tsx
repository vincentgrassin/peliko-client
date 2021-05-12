import React from "react";
import Text from "../Text";
import StyleSheet from "../StyleSheet";
import RollThumbnail from "../RollThumbnail";
import ScrollView from "../ScrollView";
import { RollData } from "../../utils/types/types";
import { getThumbnailRollColor } from "../../utils/helpers/colorHelper";
import {
  GET_ROLLS,
  GET_USERS,
  GET_THUMBNAIL_ROLLS_LIST_BY_USER,
  GET_USER_BY_ID,
  TEST
} from "../../utils/helpers/queries";
import { useQuery } from "../../utils/hooks/useApolloClient";
import { useNavigationContext } from "../../navigation/NavigationContext";

interface TabContentProps {
  isOpenRollTab: boolean;
}

const style = StyleSheet.create({
  tabContent: {
    flex: 1
  }
});

const TabContent: React.FC<TabContentProps> = ({ isOpenRollTab }) => {
  const { userId } = useNavigationContext();
  const [rollList, setRollList] = React.useState<RollData[]>([]);
  console.log(userId, typeof userId);
  const { loading, error, data } = useQuery(GET_THUMBNAIL_ROLLS_LIST_BY_USER, {
    variables: { id: 1 }
  });
  console.log(error);

  // const { loading, error, data } = useQuery(GET_USERS);
  // const rollList: RollData[] = data.rolls;

  React.useEffect(() => {
    data && setRollList(data.rolls);
  }, [isOpenRollTab]);
  console.log({ loading, isOpenRollTab, data });

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
