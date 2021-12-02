import * as React from "react";
import { makeStyles } from "react-native-elements";
import Text from "../Text";
import View from "../View";
import { svgMapping } from "../../utils/helpers/constants";
import { SvgType } from "../../utils/types/types";

interface IllustrationProps {
  image: SvgType;
  text?: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  }
}));

const Illustration: React.FC<IllustrationProps> = ({ image, text }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {svgMapping[image]}
      <Text h1>{text}</Text>
    </View>
  );
};

export default Illustration;
