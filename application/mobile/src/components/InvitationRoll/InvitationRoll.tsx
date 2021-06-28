import React from "react";
import { ImageSourcePropType } from "react-native";
import View from "../View";
import Text from "../Text";
import StyleSheet from "../StyleSheet";
import Avatar from "../Avatar";
import Button from "../Button";
import { resources } from "../../themeHelpers";
import { useMutation } from "../../utils/hooks/useApolloClient";
import { DECLINE_INVITATION, JOIN_ROLL } from "../../utils/helpers/mutation";
import { GET_INVITATIONS_BY_USER } from "../../utils/helpers/queries";

interface InvitationRollProps {
  adminAvatarSource: ImageSourcePropType | undefined;
  rollTitle: string;
  rollId: number;
  adminUserName: string;
  closingDate: string;
  index: number;
}

const style = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "row"
  },
  actions: {
    display: "flex",
    flexDirection: "row"
  }
});

const InvitationRoll: React.FC<InvitationRollProps> = ({
  adminAvatarSource,
  adminUserName,
  closingDate,
  rollTitle,
  rollId,
  index,
  ...props
}) => {
  const [joinRoll] = useMutation(JOIN_ROLL, {
    refetchQueries: [{ query: GET_INVITATIONS_BY_USER }]
  });
  const [declineRollInvitation] = useMutation(DECLINE_INVITATION, {
    refetchQueries: [{ query: GET_INVITATIONS_BY_USER }]
  });

  const handleConfirm = () => {
    joinRoll({
      variables: {
        rollId,
        accessCode: "AAA111" // fake code to remove when implementating roll validation
      }
    });
  };
  const handleDecline = () => {
    declineRollInvitation({
      variables: {
        rollId
      }
    });
  };

  return (
    <View style={style.content}>
      <Avatar
        key="avatar"
        source={adminAvatarSource}
        index={index}
        size="large"
      />
      <View>
        <View>
          <Text>
            {adminUserName} {resources.invitationText} {rollTitle}
          </Text>
          <Text>{closingDate}</Text>
        </View>
        <View style={style.actions}>
          <Button onPress={handleConfirm} title={resources.confirm} />
          <Button onPress={handleDecline} title={resources.decline} />
        </View>
      </View>
    </View>
  );
};

export default InvitationRoll;
