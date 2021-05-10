import * as React from "react";
import Text from "../Text";
import ScrollView from "../ScrollView";
import Avatar from "../Avatar";

interface RollParticipantsProps {}

const RollParticipants: React.FC<RollParticipantsProps> = ({ ...props }) => {
  return (
    <ScrollView horizontal>
      <Avatar
        source={{
          uri: "https://randomuser.me/api/portraits/men/41.jpg"
        }}
        size="large"
        notification={1}
      />
      <Avatar
        source={{
          uri: "https://randomuser.me/api/portraits/men/41.jpg"
        }}
        size="large"
      />
      <Avatar index={8} size="large" />
    </ScrollView>
  );
};

export default RollParticipants;
