import React from "react";
import { View, Text, Notification } from "../../components";

interface NotificationsProps {}

const Notifications: React.FC<NotificationsProps> = ({ ...props }) => (
  <>
    <Notification
      adminAvatarSource={undefined}
      closingDate="2024:23:34:34"
      adminUserName="bob"
      rollTitle="rollName"
    />
  </>
);

export default Notifications;
