import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadToCloudinary } from "./cloudinaryHelper";

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

  if (!result.cancelled && result.base64) {
    const jsonResponse = await uploadToCloudinary(result.base64);
    return jsonResponse.public_id;
  }
  return undefined;
};
