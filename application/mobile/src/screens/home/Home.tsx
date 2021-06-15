import React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { resources } from "../../themeHelpers";
import { Tab } from "../../components";
import { useQuery } from "../../utils/hooks/useApolloClient";
import { BYE } from "../../utils/helpers/queries";
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

  const {
    loading: loading1,
    error: error1,
    data: data1,
    refetch: refetchBye
  } = useQuery(BYE);
  console.log({ loading1, error1, data1 });

  React.useEffect(() => {
    console.log("i am refetch");
    refetchBye();
  }, [refetchBye]);

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
