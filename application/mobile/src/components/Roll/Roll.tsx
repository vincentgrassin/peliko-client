import * as React from "react";
import RollHeader from "../RollHeader";
import RollParticipants from "../RollParticipants";
import Button from "../Button";
import { resources } from "../../themeHelpers";
import { useNavigation } from "../../utils/hooks/useNavigation";
import { RollData } from "../../utils/types/types";
import { openRollsList } from "../../utils/types/dumbData";

interface RollProps {}

const Roll: React.FC<RollProps> = ({ ...props }) => {
  const { navigate } = useNavigation();

  const [roll, setRoll] = React.useState<RollData>(undefined);

  React.useEffect(() => {
    // should be replaced by useFetch hook
    const doFetch = async () => {
      setRoll(openRollsList[0]);
    };
    doFetch();
  }, []);

  return (
    <>
      <RollHeader
        name={roll?.name}
        description={roll?.description}
        closingDate={roll?.closingDate}
        remainingPictures={roll?.remainingPictures}
      />
      <RollParticipants />
      <Button
        onPress={() => navigate("CamScreen")}
        title={resources.shootPicture}
      />
    </>
  );
};

export default Roll;
