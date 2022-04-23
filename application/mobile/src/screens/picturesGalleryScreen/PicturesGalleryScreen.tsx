import * as React from "react";
import { RouteProp, useRoute } from "../../utils/hooks/useNavigation";
import { ParamList } from "../../navigation/NavigationContainer";
import { Picture, FlatList, NavigationHeader } from "../../components";
import { Picture as PictureType } from "../../utils/types/types";
import { getCloudinaryUrl } from "../../utils/helpers/cloudinaryHelper";

interface PicturesGalleryProps {}

const PicturesGallery: React.FC<PicturesGalleryProps> = ({}) => {
  const route = useRoute<RouteProp<ParamList, "PictureGalleryScreen">>();
  const { backgroundColor, pictures, computedScrollToOffset, title } =
    route?.params;
  const flatListRef = React.useRef<FlatList>(null);

  React.useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: computedScrollToOffset });
    }
  }, [computedScrollToOffset]);

  const renderItem = ({ item }: { item: PictureType }) => (
    <Picture
      url={getCloudinaryUrl(item.cloudinaryPublicId)}
      height={item.height}
      width={item.width}
      backgroundColor={backgroundColor}
      createdAt={item.createdAt}
      author={item.user}
    />
  );
  const getItemLayout = React.useCallback(
    (data, index) => ({
      length: 0,
      offset: computedScrollToOffset,
      index,
    }),
    [computedScrollToOffset]
  );

  return (
    <>
      <NavigationHeader
        color={backgroundColor}
        screen="RollScreen"
        text={title}
      />
      <FlatList
        ref={flatListRef}
        data={pictures}
        renderItem={renderItem}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        getItemLayout={getItemLayout}
      />
    </>
  );
};

export default PicturesGallery;
