import React from "react";
import { ImageSourcePropType } from "react-native";
import { useNavigation } from "../../utils/hooks/useNavigation";
import View from "../View";
import Text from "../Text";
import StyleSheet from "../StyleSheet";
import Avatar from "../Avatar";
import Button from "../Button";
import { resources } from "../../themeHelpers";

interface InvitationRollProps {
  adminAvatarSource: ImageSourcePropType | undefined;
  rollTitle: string;
  adminUserName: string;
  closingDate: string;
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

  ...props
}) => {
  const { navigate } = useNavigation();

  const handleConfirm = () => {
    console.log("action confimr");
  };
  const handleDecline = () => {
    console.log("action delcine");
  };

  return (
    <View style={style.content}>
      <Avatar key="avatar" source={adminAvatarSource} index={1} size="large" />
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
