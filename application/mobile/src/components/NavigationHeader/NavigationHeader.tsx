import * as React from "react";
import { makeStyles } from "react-native-elements";
import View from "../View";
import { iconSet, shape } from "../../themeHelpers";
import Icon from "../Icon";
import Text from "../Text";
import { useNavigation } from "../../utils/hooks/useNavigation";
import { ScreenList } from "../../navigation/NavigationContainer";

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

  const navigateToScreen = (screen: ScreenList) => {
    screen && navigate<ScreenList>(screen);
  };

  return (
    <View style={styles.root}>
      {screen && (
        <Icon
          containerStyle={styles.icon}
          {...iconSet.arrowLeft}
          onPress={() => navigateToScreen(screen)}
        />
      )}
      {text && (
        <Text h3 style={styles.title}>
          {text}
        </Text>
      )}
      {showParameters && (
        <Icon {...iconSet.cog} onPress={() => navigateToScreen("Parameters")} />
      )}
    </View>
  );
};

export default NavigationHeader;
