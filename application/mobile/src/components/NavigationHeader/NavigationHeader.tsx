import * as React from "react";
import { makeStyles } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import View from "../View";
import { iconSet, shape } from "../../themeHelpers";
import Icon from "../Icon";
import Text from "../Text";
import { useNavigation } from "../../utils/hooks/useNavigation";
import { ScreenList } from "../../navigation/NavigationContainer";
import { client } from "../../utils/hooks/useApolloClient";

interface NavigationHeaderProps {
  text?: string;
  screen?: ScreenList;
  color: string;
  size?: "small";
  showParameters?: boolean;
}

const useStyles = makeStyles(
  (theme, styleProps: { color: string; size: "small" | undefined }) => {
    const { color, size } = styleProps;
    return {
      root: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: size === "small" ? shape.spacing(4) : shape.spacing(5),
        paddingBottom: size === "small" ? 0 : shape.spacing(2),
        backgroundColor: color
      },
      icon: {
        marginLeft: shape.spacing(2)
      },
      title: {
        marginLeft: shape.spacing(2)
      }
    };
  }
);

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  text,
  screen,
  color,
  size,
  showParameters = false
}) => {
  const styles = useStyles({ color, size });
  const { navigate } = useNavigation();

  const navigatedToPreviousScreen = () => {
    screen && navigate<ScreenList>(screen);
  };

  const handleLogOut = async () => {
    await AsyncStorage.setItem("@accessToken", "");
    await AsyncStorage.setItem("@refreshToken", "");
    client.cache.reset();
    navigate<ScreenList>("Login");
  };

  return (
    <View style={styles.root}>
      {screen && (
        <Icon
          containerStyle={styles.icon}
          {...iconSet.arrowLeft}
          onPress={navigatedToPreviousScreen}
        />
      )}
      {text && (
        <Text h3 style={styles.title}>
          {text}
        </Text>
      )}
      {showParameters && <Icon {...iconSet.cog} onPress={handleLogOut} />}
    </View>
  );
};

export default NavigationHeader;
