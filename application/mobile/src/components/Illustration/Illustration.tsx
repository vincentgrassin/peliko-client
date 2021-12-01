import * as React from "react";
import { makeStyles } from "react-native-elements";
import Text from "../Text";
import View from "../View";
import Eye from "../../assets/Eye";
import Box from "../../assets/Box";
import { shape } from "../../themeHelpers";

interface IllustrationProps {
  image: string;
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

  const imageMapping: { [key: string]: JSX.Element } = {
    mailBox: <Eye />,
    box: <Box />
  };

  return (
    <View style={styles.container}>
      {imageMapping[image]}
      <Text h1>{text}</Text>
    </View>
  );
};

export default Illustration;
