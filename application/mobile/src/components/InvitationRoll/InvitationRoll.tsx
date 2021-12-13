import * as React from "react";
import { ImageSourcePropType } from "react-native";
import { makeStyles } from "react-native-elements";
import View from "../View";
import Text from "../Text";
import Avatar from "../Avatar";
import Button from "../Button";
import { resources, shape } from "../../themeHelpers";
import { useMutation } from "../../utils/hooks/useApolloClient";
import { DECLINE_INVITATION, JOIN_ROLL } from "../../utils/helpers/mutation";
import {
  GET_INVITATIONS_BY_USER,
  GET_INVITATION_COUNT_BY_USER,
  GET_ROLLS_BY_USER
} from "../../utils/helpers/queries";
import { getDateFormat } from "../../utils/helpers/dateHelper";

interface InvitationRollProps {
  adminAvatarSource: ImageSourcePropType | undefined;
  rollTitle: string;
  rollId: number;
  adminUserName: string;
  closingDate: string;
  index: number;
}

const useStyles = makeStyles(() => ({
  content: {
    display: "flex",
    flexDirection: "row",
    marginLeft: shape.spacing(2),
    marginBottom: shape.spacing(2)
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    marginTop: shape.spacing(1)
  },
  detail: {
    marginLeft: shape.spacing(2),
    flex: 1
  },
  containerStyle: {
    marginRight: shape.spacing(2)
  }
}));

const InvitationRoll: React.FC<InvitationRollProps> = ({
  adminAvatarSource,
  adminUserName,
  closingDate,
  rollTitle,
  rollId,
  index
}) => {
  const styles = useStyles();

  const [joinRoll] = useMutation(JOIN_ROLL);
  const [declineRollInvitation] = useMutation(DECLINE_INVITATION);

  const handleConfirm = () => {
    joinRoll({
      variables: {
        rollId,
        accessCode: "AAA111" // fake code to remove when implementating roll validation
      },
      refetchQueries: [
        { query: GET_INVITATIONS_BY_USER },
        { query: GET_ROLLS_BY_USER, variables: { isOpenTab: true } },
        { query: GET_INVITATION_COUNT_BY_USER }
      ],
      awaitRefetchQueries: true
    });
  };
  const handleDecline = () => {
    declineRollInvitation({
      variables: {
        rollId
      },
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: GET_INVITATIONS_BY_USER },
        { query: GET_INVITATION_COUNT_BY_USER }
      ]
    });
  };

  return (
    <View style={styles.content}>
      <Avatar
        key="avatar"
        source={adminAvatarSource}
        index={index}
        size="medium"
      />
      <View style={styles.detail}>
        <View>
          <Text>
            {adminUserName} {resources.invitationText} {rollTitle}
          </Text>
          <Text>{getDateFormat(closingDate)}</Text>
        </View>
        <View style={styles.actions}>
          <Button
            onPress={handleConfirm}
            title={resources.confirm}
            size="small"
            containerStyle={styles.containerStyle}
          />
          <Button
            onPress={handleDecline}
            title={resources.decline}
            size="small"
            type="outline"
          />
        </View>
      </View>
    </View>
  );
};

export default InvitationRoll;
