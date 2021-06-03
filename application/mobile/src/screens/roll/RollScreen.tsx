import React from "react";
import { Button, Text, RollHeader, RollParticipants } from "../../components";
import { resources } from "../../themeHelpers";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "../../utils/hooks/useNavigation";
import { ParamList } from "../../navigation/NavigationContainer";
import { GET_ROLL_BY_ID } from "../../utils/helpers/queries";
import { useQuery } from "../../utils/hooks/useApolloClient";
import { RollData } from "../../utils/types/types";

interface RollProps {}

const Roll: React.FC<RollProps> = ({ ...props }) => {
  const { navigate } = useNavigation();
  const route = useRoute<RouteProp<ParamList, "RollScreen">>();
  const rollId = route?.params?.rollId;

  const { loading, error, data } = useQuery(GET_ROLL_BY_ID, {
    variables: { id: rollId }
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Oh no... {error.message}</Text>;

  const { roll }: { roll: RollData } = data;
  return (
    <>
      <RollHeader
        name={roll?.name}
        description={roll?.description}
        closingDate={roll?.closingDate}
        remainingPictures={roll?.remainingPictures}
      />
      <RollParticipants participants={roll?.participants} />
      <Button
        onPress={() => navigate("CamScreen", { rollId })}
        title={resources.shootPicture}
      />
    </>
  );
};

export default Roll;
