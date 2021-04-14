import * as React from "react";
import RollHeader from "../RollHeader";
import RollParticipants from "../RollParticipants";
import Button from "../Button";
import { resources } from "../../themeHelpers";
import useNavigation from "../../utils/hooks/useNavigation";

interface RollProps {}

const Roll: React.FC<RollProps> = ({ ...props }) => {
  const { navigate } = useNavigation();

  return (
    <>
      <RollHeader />
      <RollParticipants />
      <Button
        onPress={() => navigate("CamContainer")}
        title={resources.shootPicture}
      />
    </>
  );
};

export default Roll;
