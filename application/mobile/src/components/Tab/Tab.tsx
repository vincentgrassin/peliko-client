import React from "react";
import Text from "../Text";
import StyleSheet from "../StyleSheet";
import RollThumbnail from "../RollThumbnail";
import ScrollView from "../ScrollView";
import { RollData } from "../../utils/types/types";
import { getThumbnailRollColor } from "../../utils/helpers/colorHelper";
import { GET_ROLLS_BY_USER } from "../../utils/helpers/queries";
import { useQuery } from "../../utils/hooks/useApolloClient";
import { useNavigationContext } from "../../navigation/NavigationContext";

interface TabProps {
  isOpenRollTab: boolean;
}

const style = StyleSheet.create({
  tab: {
    flex: 1
  }
});

const Tab: React.FC<TabProps> = ({ isOpenRollTab }) => {
  const { userId } = useNavigationContext();
  const { loading, error, data } = useQuery(GET_ROLLS_BY_USER, {
    variables: { id: userId, isOpenTab: isOpenRollTab }
  });
  const rollList: RollData[] = data?.rollsByUser;

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Oh no... {error.message}</Text>;

  return (
    <ScrollView style={style.tab}>
      <Text>{isOpenRollTab ? "open" : "closed"}</Text>
      {rollList &&
        rollList.map((roll, index) => (
          <RollThumbnail
            key={index}
            backgroundColor={getThumbnailRollColor(index)}
            rollName={roll?.name}
            pictureNumber={roll?.remainingPictures}
            participantNumber={roll?.participants?.length}
            closingDate={roll?.closingDate}
            hasBeenDiscovered={false}
            rollId={roll?.id}
          />
        ))}
    </ScrollView>
  );
};

export default Tab;
