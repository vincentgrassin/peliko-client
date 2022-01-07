import * as React from "react";
import { makeStyles } from "react-native-elements";
import { Image, ImageSourcePropType } from "react-native";
import {
  PICTURE_LEGEND_HEIGHT,
  screenWidth
} from "../../utils/helpers/constants";
import { Colors } from "../../utils/types/types";
import { View, Text } from "..";

interface PictureProps {
  height: number;
  width: number;
  url: string;
  backgroundColor: Colors;
}

const useStyles = makeStyles(
  (theme, styleProps: { height: number; backgroundColor: Colors }) => {
    const { height, backgroundColor } = styleProps;
    return {
      picture: { height },
      legend: {
        backgroundColor,
        height: PICTURE_LEGEND_HEIGHT
      }
    };
  }
);

const Picture: React.FC<PictureProps> = ({
  height,
  url,
  width,
  backgroundColor
}) => {
  const styles = useStyles({
    height: width ? (height * screenWidth) / width : 0,
    backgroundColor
  });

  return (
    <>
      <Image
        style={styles.picture}
        source={{ uri: url } as unknown as ImageSourcePropType}
      />
      <View style={styles.legend}>
        <Text>Hello</Text>
      </View>
    </>
  );
};

export default Picture;
