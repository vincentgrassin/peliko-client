import * as React from "react";
import { makeStyles } from "react-native-elements";
import RollThumbnail from "../RollThumbnail";
import Loader from "../Loader";
import { RollData } from "../../utils/types/types";
import { getAlternateColor } from "../../utils/helpers/colorHelper";
import {
  GET_INVITATION_COUNT_BY_USER,
  GET_ROLLS_BY_USER
} from "../../utils/helpers/queries";
import { useQuery } from "../../utils/hooks/useApolloClient";
import { resources, shape } from "../../themeHelpers";
import View from "../View";
import FlatList from "../FlatList";
import Illustration from "../Illustration";
import { useNavigationContext } from "../../navigation/NavigationContext";
import ErrorMessage from "../ErrorMessage";
import { useHandleServerError } from "../../utils/hooks/useHandleServerError";

interface TabProps {
  isOpenRollTab: boolean;
}
const useStyles = makeStyles(() => ({
  emptyIllustration: {
    flex: 1
  },
  thumbNail: {
    marginTop: shape.spacing(2),
    marginLeft: shape.spacing(2),
    marginRight: shape.spacing(2)
  }
}));

const Tab: React.FC<TabProps> = ({ isOpenRollTab }) => {
  const styles = useStyles();
  const { updateNotificationNumber } = useNavigationContext();
  const { handleError } = useHandleServerError();

  const { loading, error, data } = useQuery(GET_ROLLS_BY_USER, {
    variables: { isOpenTab: isOpenRollTab },
    onError: handleError
  });

  const { data: count } = useQuery(GET_INVITATION_COUNT_BY_USER, {
    onError: handleError
  });

  React.useEffect(() => {
    if (
      count?.invitationNotificationCountByUser ||
      count?.invitationNotificationCountByUser === 0
    ) {
      updateNotificationNumber(count.invitationNotificationCountByUser);
    }
  }, [count, updateNotificationNumber]);

  if (loading) return <Loader />;
  if (error) {
    return <ErrorMessage message={error.message} error={error} />;
  }

  const rollList: RollData[] = data?.rollsByUser;

  return (
    <>
      {rollList && rollList.length > 0 ? (
        <FlatList
          data={rollList}
          renderItem={({ item, index }) => (
            <View style={styles.thumbNail} key={index}>
              <RollThumbnail
                backgroundColor={getAlternateColor(index)}
                rollName={item.name}
                pictureNumber={item.remainingPictures}
                participantNumber={item.participants?.length}
                closingDate={item.closingDate}
                hasBeenDiscovered={false}
                rollId={item?.id}
                isOpenRoll={isOpenRollTab}
                coverPictureId={item.coverPictureId}
              />
            </View>
          )}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.emptyIllustration}>
          <Illustration image="box" text={resources.emptyRolls} />
        </View>
      )}
    </>
  );
};

export default Tab;
