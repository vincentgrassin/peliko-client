import React from "react";
import { View, Tab, TabsHeader } from "../../components";

interface HomeProps {}

const Home: React.FC<HomeProps> = ({ ...props }) => {
  const [isOpenRollTabActive, setIsOpenRollTabActive] = React.useState<boolean>(
    true
  );

  const handleTabChange = () => {
    isOpenRollTabActive
      ? setIsOpenRollTabActive(false)
      : setIsOpenRollTabActive(true);
  };

  return (
    <View>
      <TabsHeader
        isOpenRollTabActive={isOpenRollTabActive}
        handlePress={handleTabChange}
      />
      <Tab
        isOpenRollTab={isOpenRollTabActive}
        onSwipeRight={handleTabChange}
        onSwipeLeft={handleTabChange}
      />
    </View>
  );
};
export default Home;
