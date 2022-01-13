import * as React from "react";
import { makeStyles } from "react-native-elements";
import { Image, ImageSourcePropType } from "react-native";
import {
  PICTURE_LEGEND_HEIGHT,
  screenWidth
} from "../../utils/helpers/constants";
import { Colors } from "../../utils/types/types";
import View from "../View";
import Text from "../Text";
import { getDateFormat } from "../../utils/helpers/dateHelper";
import { resources } from "../../themeHelpers";

interface PictureProps {
  height: number;
  width: number;
  url: string;
  backgroundColor: Colors;
  createdAt: any;
  author: {
    id: number;
    name?: string;
    phoneNumber?: string;
  };
}

const useStyles = makeStyles(
  (theme, styleProps: { height: number; backgroundColor: Colors }) => {
    const { height, backgroundColor } = styleProps;
    return {
      picture: { height },
      legend: {
        backgroundColor,
        height: PICTURE_LEGEND_HEIGHT,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
      }
    };
  }
);

const Picture: React.FC<PictureProps> = ({
  height,
  url,
  width,
  backgroundColor,
  createdAt,
  author
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
        {author && (
          <Text h3>
            {resources.shotBy} {author.name || author.phoneNumber}
          </Text>
        )}
        {createdAt && <Text h3>{getDateFormat(+createdAt)}</Text>}
      </View>
    </>
  );
};

export default Picture;
