import React from "react";
import { makeStyles } from "react-native-elements";
import {
  Button,
  Text,
  RollHeader,
  RollParticipants,
  ScrollView
} from "../../components";
import { resources, shape } from "../../themeHelpers";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "../../utils/hooks/useNavigation";
import { ParamList } from "../../navigation/NavigationContainer";
import { GET_ROLL_BY_ID } from "../../utils/helpers/queries";
import { useQuery } from "../../utils/hooks/useApolloClient";
import { RollData } from "../../utils/types/types";
import RollPictures from "../../components/RollPictures";

interface RollProps {}

const useStyles = makeStyles(() => ({
  participants: {
    margin: shape.spacing(2)
  }
}));

const Roll: React.FC<RollProps> = ({ ...props }) => {
  const styles = useStyles();

  const { navigate } = useNavigation();
  const route = useRoute<RouteProp<ParamList, "RollScreen">>();
  const rollId = route?.params?.rollId;
  const isOpenRoll = route?.params?.isOpenRoll;
  const { loading, error, data } = useQuery(GET_ROLL_BY_ID, {
    variables: { id: rollId }
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Oh no... {error.message}</Text>;

  const { roll }: { roll: RollData } = data;

  const HeaderRollComponent: JSX.Element = (
    <>
      <RollHeader
        name={roll?.name}
        description={roll?.description}
        closingDate={roll?.closingDate}
        remainingPictures={roll?.remainingPictures}
      />
      <RollParticipants
        participants={roll?.participants}
        className={styles.participants}
      />
    </>
  );

  return (
    <>
      {isOpenRoll ? (
        <ScrollView>
          {HeaderRollComponent}
          {roll && roll.remainingPictures > 0 && (
            <Button
              onPress={() => navigate("CamScreen", { rollId })}
              title={resources.shootPicture}
            />
          )}
        </ScrollView>
      ) : (
        <RollPictures
          rollId={rollId}
          listHeaderComponent={HeaderRollComponent}
        />
      )}
    </>
  );
};

export default Roll;
