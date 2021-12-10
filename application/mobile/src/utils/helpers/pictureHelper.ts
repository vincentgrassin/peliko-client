import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

const getPermissions = async () => {
  if (Platform.OS !== "web") {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("not  granted");
    }
  }
};

export const pickImageFromGallery = async () => {
  getPermissions();
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    base64: true
  });

  if (!result.cancelled) {
    return {
      base64: result.base64,
      uri: result.uri
    };
  }
  return {
    base64: "",
    uri: ""
  };
};
