import React from "react";
import { InvitationRoll } from "../../components";
import { useQuery } from "../../utils/hooks/useApolloClient";
import { GET_INVITATIONS_BY_USER } from "../../utils/helpers/queries";

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = ({ ...props }) => {
  const { loading, error, data } = useQuery(GET_INVITATIONS_BY_USER);
  console.log({ loading, error, data });
  return (
    <InvitationRoll
      adminAvatarSource={undefined}
      closingDate="2024:23:34:34"
      adminUserName="bob"
      rollTitle="rollName"
    />
  );
};

export default Notifications;
