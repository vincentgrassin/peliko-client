import React from "react";
import { ScaledSize, useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar, TabBarProps } from "react-native-tab-view";
import { makeStyles } from "react-native-elements";
import { palette, resources } from "../../themeHelpers";
import { Tab } from "../../components";
import NavigationHeader from "../../components/NavigationHeader";

interface HomeProps {}

const useStyles = makeStyles((theme, styleProps: { layout: ScaledSize }) => {
  const { layout } = styleProps;
  return {
    layout: { width: layout.width },
    indicator: {
      backgroundColor: palette("black")
    },
    tabBar: {
      backgroundColor: palette("blue")
    }
  };
});

const Home: React.FC<HomeProps> = ({ ...props }) => {
  const layout = useWindowDimensions();
  const styles = useStyles({ layout });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "openRollList", title: resources.openRollListTabTitle },
    { key: "closedRollList", title: resources.closedRollListTabTitle }
  ]);
  const renderScene = SceneMap({
    openRollList: () => <Tab isOpenRollTab />,
    closedRollList: () => <Tab isOpenRollTab={false} />
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      activeColor={palette("black")}
      inactiveColor={palette("grey")}
    />
  );

  return (
    <>
      <NavigationHeader color={palette("blue")} showParameters size="small" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={styles.layout}
      />
    </>
  );
};

export default Home;
