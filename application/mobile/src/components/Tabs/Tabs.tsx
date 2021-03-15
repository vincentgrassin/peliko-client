import * as React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { resources } from "../../themeHelpers";
import TabContent from "../TabContent";

interface TabsProps {}

const OpenRollTab = () => <TabContent isOpenRollTab />;

const ClosedRollTab = () => <TabContent isOpenRollTab={false} />;

const Tabs: React.FC<TabsProps> = ({ ...props }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "openRollList", title: resources.openRollListTabTitle },
    { key: "closedRollList", title: resources.closedRollListTabTitle }
  ]);

  const renderScene = SceneMap({
    openRollList: OpenRollTab,
    closedRollList: ClosedRollTab
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

export default Tabs;
