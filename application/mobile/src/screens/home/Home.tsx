import React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { resources } from "../../themeHelpers";
import { Tab } from "../../components";
// import { useQuery } from "../../utils/hooks/useApolloClient";
// import { BYE } from "../../utils/helpers/queries";
interface HomeProps {}

const Home: React.FC<HomeProps> = ({ ...props }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "openRollList", title: resources.openRollListTabTitle },
    { key: "closedRollList", title: resources.closedRollListTabTitle }
  ]);
  const renderScene = SceneMap({
    openRollList: () => <Tab isOpenRollTab />,
    closedRollList: () => <Tab isOpenRollTab={false} />
  });

  // to do remove : user from Nav context, remove dumb data
  // update all queries and muation

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default Home;
