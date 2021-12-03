import * as React from "react";
import { makeStyles } from "react-native-elements";
import { StyleProp, ViewStyle } from "react-native";
import ScrollView from "../ScrollView";
import Avatar from "../Avatar";
import Text from "../Text";
import View from "../View";
import { Participant } from "../../utils/types/types";
import { resources, shape } from "../../themeHelpers";

interface RollParticipantsProps {
  participants: Participant[] | undefined;
  className: StyleProp<ViewStyle>;
}

const useStyles = makeStyles((theme) => ({
  participants: {
    flex: 1
  },
  participant: {
    marginRight: shape.spacing(1)
  },
  title: {
    marginBottom: shape.spacing(2)
  }
}));

const RollParticipants: React.FC<RollParticipantsProps> = ({
  participants,
  className,
  ...props
}) => {
  const styles = useStyles();

  return (
    <View style={[styles.participants, className]}>
      <Text h2 style={styles.title}>
        {resources.participants} {participants?.length ?? 0}
      </Text>
      <ScrollView horizontal>
        {participants &&
          participants?.map((participant, index) => {
            return (
              <View style={styles.participant} key={`avatar-${index}`}>
                <Avatar
                  source={
                    participant.avatarImageUri
                      ? {
                          uri: participant.avatarImageUri
                        }
                      : undefined
                  }
                  index={index}
                  size="large"
                  notification={participant.pictureCount}
                />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default RollParticipants;
