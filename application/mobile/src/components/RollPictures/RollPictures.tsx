import * as React from "react";
import { makeStyles } from "react-native-elements";
import { Image, ImageSourcePropType } from "react-native";
import View from "../View";
import FlatList from "../FlatList";
import { useQuery } from "../../utils/hooks/useApolloClient";
import { GET_PICTURES_BY_ROLL } from "../../utils/helpers/queries";
import { getCloudinaryUrl } from "../../utils/helpers/cloudinaryHelper";
import { Picture } from "../../utils/types/types";

interface RollPicturesProps {
  rollId: number;
  listHeaderComponent: JSX.Element;
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white"
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: 100
  },
  item: {
    flex: 1,
    flexDirection: "column",
    margin: 1
  }
}));

const RollPictures: React.FC<RollPicturesProps> = ({
  rollId,
  listHeaderComponent
}) => {
  const styles = useStyles();

  const { loading, error, data } = useQuery(GET_PICTURES_BY_ROLL, {
    variables: { rollId }
  });

  const pictures = (data?.getPicturesByRoll as Picture[]).map(
    ({ cloudinaryPublicId }) => getCloudinaryUrl(cloudinaryPublicId)
  );

  return (
    <FlatList
      data={
        (pictures as unknown) as readonly React.ReactElement<
          any,
          string | React.JSXElementConstructor<any>
        >[]
      }
      ListHeaderComponent={listHeaderComponent}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image
            style={styles.imageThumbnail}
            source={({ uri: item } as unknown) as ImageSourcePropType}
          />
        </View>
      )}
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default RollPictures;
