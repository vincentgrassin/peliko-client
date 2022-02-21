import * as React from "react";
import { makeStyles } from "react-native-elements";
import {
  Illustration,
  InvitationRoll,
  Loader,
  ScrollView,
  NavigationHeader,
  View,
  ErrorMessage
} from "../../components";
import { useQuery } from "../../utils/hooks/useApolloClient";
import { InvitationRoll as InvitationRollType } from "../../utils/types/types";
import { GET_INVITATIONS_BY_USER } from "../../utils/helpers/queries";
import { palette, resources, shape } from "../../themeHelpers";
import { useHandleQueryError } from "../../utils/hooks/useHandleQueryError";

interface NotificationsProps {}

const useStyles = makeStyles(() => ({
  invitationList: {
    marginTop: shape.spacing(2)
  },
  emptyIllustration: {
    flex: 1
  }
}));

const Notifications: React.FC<NotificationsProps> = ({}) => {
  const styles = useStyles();
  const { handleError } = useHandleQueryError();
  const { loading, error, data } = useQuery(GET_INVITATIONS_BY_USER, {
    onError: handleError
  });

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  const invitationRollsByUser: InvitationRollType[] =
    data?.invitationRollsByUser;

  return (
    <>
      <NavigationHeader
        color={palette("green")}
        text={resources.notificationScreen}
        screen="Home"
      />
      {invitationRollsByUser?.length > 0 ? (
        <ScrollView style={styles.invitationList}>
          {invitationRollsByUser.map((invitation, index) => (
            <InvitationRoll
              key={index}
              adminAvatarSource={undefined}
              closingDate={invitation.roll.closingDate}
              adminUserName={invitation.admin.name}
              rollTitle={invitation.roll.name}
              rollId={invitation.roll.id}
              index={index}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyIllustration}>
          <Illustration image="mailbox" text={resources.emptyNotifications} />
        </View>
      )}
    </>
  );
};

export default Notifications;
