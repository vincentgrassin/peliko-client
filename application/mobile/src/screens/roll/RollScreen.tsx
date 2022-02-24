import * as React from "react";
import { makeStyles } from "react-native-elements";
import {
  Button,
  RollHeader,
  RollParticipants,
  ScrollView,
  NavigationHeader,
  Loader,
  Icon,
  ErrorMessage,
  Text
} from "../../components";
import { iconSet, resources, shape } from "../../themeHelpers";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "../../utils/hooks/useNavigation";
import { ParamList, ScreenList } from "../../navigation/NavigationContainer";
import { GET_ROLL_BY_ID } from "../../utils/helpers/queries";
import { useQuery } from "../../utils/hooks/useApolloClient";
import { RollData } from "../../utils/types/types";
import RollPictures from "../../components/RollPictures";
import { useHandleQueryError } from "../../utils/hooks/useHandleQueryError";

interface RollProps {}

const useStyles = makeStyles(() => ({
  participants: {
    margin: shape.spacing(2)
  },
  shootButton: {
    width: "75%",
    marginBottom: shape.spacing(6),
    alignSelf: "center"
  },
  rollContainer: {
    display: "flex",
    flex: 1
  }
}));

const Roll: React.FC<RollProps> = ({}) => {
  const styles = useStyles();
  const { handleError } = useHandleQueryError();
  const { navigate } = useNavigation();
  const route = useRoute<RouteProp<ParamList, "RollScreen">>();
  const { rollId, isOpenRoll, errorMessage, backgroundColor } = route?.params;
  const { loading, error, data } = useQuery(GET_ROLL_BY_ID, {
    variables: { id: rollId },
    onError: handleError
  });

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  const { roll }: { roll: RollData } = data;

  const HeaderRollComponent: JSX.Element = (
    <>
      {roll && (
        <>
          <NavigationHeader
            text={resources.roll}
            screen="BottomNavigation"
            color={backgroundColor}
          />
          <RollHeader
            name={roll?.name}
            description={roll.description}
            closingDate={roll.closingDate}
            remainingPictures={roll.remainingPictures}
          />
          <RollParticipants
            participants={roll.participants}
            className={styles.participants}
          />
        </>
      )}
    </>
  );

  return (
    <>
      {isOpenRoll ? (
        <ScrollView contentContainerStyle={styles.rollContainer}>
          {HeaderRollComponent}
          {!!errorMessage && <Text isError>{errorMessage}</Text>}
          {roll && roll.remainingPictures > 0 && (
            <Button
              containerStyle={styles.shootButton}
              onPress={() =>
                navigate<ScreenList>("CamScreen", { rollId, backgroundColor })
              }
              title={<Icon {...iconSet.camera} />}
              color={backgroundColor}
            />
          )}
        </ScrollView>
      ) : (
        <RollPictures
          rollId={rollId}
          listHeaderComponent={HeaderRollComponent}
          backgroundColor={backgroundColor}
          title={roll.name}
        />
      )}
    </>
  );
};

export default Roll;
