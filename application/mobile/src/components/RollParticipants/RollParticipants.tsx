import * as React from "react";
import { makeStyles } from "react-native-elements";
import { StyleProp, ViewStyle } from "react-native";
import ScrollView from "../ScrollView";
import Avatar from "../Avatar";
import Text from "../Text";
import View from "../View";
import { Participant, User } from "../../utils/types/types";
import { resources, shape } from "../../themeHelpers";
import { useQuery } from "../../utils/hooks/useApolloClient";
import { GET_USERS_BY_IDS } from "../../utils/helpers/queries";
import { getCloudinaryUrl } from "../../utils/helpers/cloudinaryHelper";

interface RollParticipantsProps {
  participants: Participant[] | undefined;
  className: StyleProp<ViewStyle>;
}

const useStyles = makeStyles(() => ({
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
  className
}) => {
  const styles = useStyles();
  const ids = participants?.map((p) => p.userId).filter(Boolean);
  const { data } = useQuery(GET_USERS_BY_IDS, {
    variables: { ids }
  });
  const users: User[] = data?.getUsersByIds;

  return (
    <View style={[styles.participants, className]}>
      <Text h2 style={styles.title}>
        {resources.participants} {participants?.length ?? 0}
      </Text>
      <ScrollView horizontal>
        {participants &&
          participants?.map((participant, index) => {
            const associatedUser = users?.find(
              (u) => u.id === participant.userId
            );
            const profilePictureUrl =
              associatedUser?.avatarCloudinaryPublicId &&
              getCloudinaryUrl(associatedUser?.avatarCloudinaryPublicId);
            return (
              <View style={styles.participant} key={`avatar-${index}`}>
                <Avatar
                  source={
                    profilePictureUrl
                      ? {
                          uri: profilePictureUrl
                        }
                      : undefined
                  }
                  index={index}
                  size="large"
                  notification={participant.pictureCount}
                  name={associatedUser?.name || associatedUser?.phoneNumber}
                />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default RollParticipants;
