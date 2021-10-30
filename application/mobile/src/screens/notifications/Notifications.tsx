import React from "react";
import { makeStyles } from "react-native-elements";
import { InvitationRoll, ScrollView, Text } from "../../components";
import { useQuery } from "../../utils/hooks/useApolloClient";
import { InvitationRoll as InvitationRollType } from "../../utils/types/types";
import { GET_INVITATIONS_BY_USER } from "../../utils/helpers/queries";
import { palette, resources, shape } from "../../themeHelpers";
import NavigationHeader from "../../components/NavigationHeader";

interface NotificationsProps {}

const useStyles = makeStyles((theme) => ({
  invitationList: {
    marginTop: shape.spacing(2)
  }
}));

const Notifications: React.FC<NotificationsProps> = ({ ...props }) => {
  const { loading, error, data } = useQuery(GET_INVITATIONS_BY_USER);
  const styles = useStyles();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Oh no... {error.message}</Text>;

  const invitationRollsByUser: InvitationRollType[] =
    data?.invitationRollsByUser;

  return (
    <>
      <NavigationHeader
        color={palette("green")}
        text={resources.notificationScreen}
      />
      <ScrollView style={styles.invitationList}>
        {invitationRollsByUser &&
          invitationRollsByUser.length > 0 &&
          invitationRollsByUser.map((invitation, index) => (
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
    </>
  );
};

export default Notifications;
