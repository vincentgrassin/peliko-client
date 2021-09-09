import * as React from "react";
import { makeStyles } from "react-native-elements";
import ScrollView from "../ScrollView";
import Avatar from "../Avatar";
import Text from "../Text";
import View from "../View";
import { Participant } from "../../utils/types/types";
import { resources, shape } from "../../themeHelpers";

interface RollParticipantsProps {
  participants: Participant[] | undefined;
}

const useStyles = makeStyles((theme) => ({
  participants: {
    flex: 1
  },
  participant: {
    marginRight: shape.spacing(1)
  }
}));

const RollParticipants: React.FC<RollParticipantsProps> = ({
  participants,
  ...props
}) => {
  const styles = useStyles();

  console.log(participants);

  return (
    <View style={styles.participants}>
      <Text h3>
        {resources.participants} {participants?.length ?? 0}
      </Text>
      <ScrollView horizontal>
        {participants &&
          participants?.map((participant, index) => {
            return (
              <View style={styles.participant}>
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
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default RollParticipants;
