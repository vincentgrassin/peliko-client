import * as React from "react";
import ScrollView from "../ScrollView";
import Avatar from "../Avatar";
import { Participant } from "../../utils/types/types";

interface RollParticipantsProps {
  participants: Participant[] | undefined;
}

const RollParticipants: React.FC<RollParticipantsProps> = ({
  participants,
  ...props
}) => {
  return (
    <ScrollView horizontal>
      {participants &&
        participants?.map((participant, index) => {
          return (
            <Avatar
              key={`avatar-${index}`}
              source={
                participant.avatarImageUri
                  ? {
                      uri: participant.avatarImageUri
                    }
                  : undefined
              }
              index={index}
              size="large"
              notification={1}
            />
          );
        })}
    </ScrollView>
  );
};

export default RollParticipants;
