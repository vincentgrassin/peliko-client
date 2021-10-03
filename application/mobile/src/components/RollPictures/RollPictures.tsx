import * as React from "react";
import { makeStyles } from "react-native-elements";
import { SafeAreaView, Image } from "react-native";
import Text from "../Text";
import View from "../View";
import FlatList from "../FlatList";
import { useQuery } from "../../utils/hooks/useApolloClient";
import { GET_ROLL_BY_ID } from "../../utils/helpers/queries";

interface RollPicturesProps {
  rollId: number;
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
  }
}));

const RollPictures: React.FC<RollPicturesProps> = ({ rollId }) => {
  const styles = useStyles();

  const [dataSource, setDataSource] = React.useState([]);

  const { loading, error, data } = useQuery(GET_ROLL_BY_ID, {
    variables: { rollId }
  });

  React.useEffect(() => {
    const items = Array.apply(null, Array(60)).map((v, i) => {
      return {
        id: i,
        src: `http://placehold.it/200x200?text=${i + 1}`
      };
    });
    setDataSource(items);
  }, []);

  return (
    <View>
      <Text>Pictures</Text>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={dataSource}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                margin: 1
              }}
            >
              <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
            </View>
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </View>
  );
};

export default RollPictures;
