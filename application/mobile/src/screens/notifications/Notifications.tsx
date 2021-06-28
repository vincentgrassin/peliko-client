import React from "react";
import { InvitationRoll, Text } from "../../components";
import { useQuery } from "../../utils/hooks/useApolloClient";
import { InvitationRoll as InvitationRollType } from "../../utils/types/types";
import { GET_INVITATIONS_BY_USER } from "../../utils/helpers/queries";

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = ({ ...props }) => {
  const { loading, error, data } = useQuery(GET_INVITATIONS_BY_USER);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Oh no... {error.message}</Text>;

  const invitationRollsByUser: InvitationRollType[] =
    data?.invitationRollsByUser;

  return (
    <>
      {invitationRollsByUser &&
        invitationRollsByUser.length > 0 &&
        invitationRollsByUser.map((invitation, index) => (
          <InvitationRoll
            key={index}
            adminAvatarSource={undefined}
            closingDate={invitation.roll.closingData}
            adminUserName={invitation.admin.name}
            rollTitle={invitation.roll.name}
            rollId={invitation.roll.id}
            index={index}
          />
        ))}
    </>
  );
};

export default Notifications;
