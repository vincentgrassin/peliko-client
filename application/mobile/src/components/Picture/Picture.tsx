import * as React from "react";
import { makeStyles } from "react-native-elements";
import { Image, ImageSourcePropType } from "react-native";
import { screenWidth } from "../../utils/helpers/constants";

interface PictureProps {
  height: number;
  width: number;
  url: string;
}

const useStyles = makeStyles((theme, styleProps: { height: number }) => {
  const { height } = styleProps;
  return {
    picture: { height }
  };
});

const Picture: React.FC<PictureProps> = ({ height, url, width }) => {
  const styles = useStyles({
    height: width ? (height * screenWidth) / width : 0
  });

  return (
    <Image
      style={styles.picture}
      source={({ uri: url } as unknown) as ImageSourcePropType}
    />
  );
};

export default Picture;
