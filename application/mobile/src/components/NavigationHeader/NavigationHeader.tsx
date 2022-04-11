import * as React from "react";
import { makeStyles } from "react-native-elements";
import View from "../View";
import { iconSet, shape } from "../../themeHelpers";
import Icon from "../Icon";
import Text from "../Text";
import { useNavigation } from "../../utils/hooks/useNavigation";
import { ScreenList } from "../../navigation/NavigationContainer";
import { PellikoLogoHorizontal } from "../../assets";

interface NavigationHeaderProps {
  text?: string;
  screen?: ScreenList;
  color: string;
  size?: "small";
  showLogoAndParameter?: boolean;
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
        backgroundColor: color,
      },
      icon: {
        marginLeft: shape.spacing(2),
      },
      title: {
        marginLeft: shape.spacing(2),
      },
      logo: {
        flex: 1,
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      },
      parameterIcon: {
        paddingRight: shape.spacing(2),
        position: "absolute",
        right: shape.spacing(2),
      },
    };
  }
);

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  text,
  screen,
  color,
  size,
  showLogoAndParameter = false,
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
        <Text h2 style={styles.title}>
          {text}
        </Text>
      )}
      {showLogoAndParameter && (
        <View style={styles.logo}>
          <PellikoLogoHorizontal height={25} width={120} />
          <Icon
            {...iconSet.cog}
            onPress={() => navigateToScreen("Parameters")}
            containerStyle={styles.parameterIcon}
          />
        </View>
      )}
    </View>
  );
};

export default NavigationHeader;
