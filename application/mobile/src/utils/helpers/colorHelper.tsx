import { Image } from "react-native";
import { palette } from "../../themeHelpers";
//@ts-ignore
import defaultPelikoFaceBlue from "../../assets/pelikoface-blue.png";
//@ts-ignore
import defaultPelikoFacePink from "../../assets/pelikoface-pink.png";
//@ts-ignore
import defaultPelikoFaceOrange from "../../assets/pelikoface-orange.png";
//@ts-ignore
import defaultPelikoFaceYellow from "../../assets/pelikoface-yellow.png";
//@ts-ignore

const defaultPelikoFaceBlueUri = Image.resolveAssetSource(defaultPelikoFaceBlue)
  .uri;
const defaultPelikoFacePinkUri = Image.resolveAssetSource(defaultPelikoFacePink)
  .uri;
const defaultPelikoFaceOrangeUri = Image.resolveAssetSource(
  defaultPelikoFaceOrange
).uri;
const defaultPelikoFaceYellowUri = Image.resolveAssetSource(
  defaultPelikoFaceYellow
).uri;

export const getThumbnailRollColor = (index: number) => {
  return (index + 3) % 3 === 0
    ? palette("yellow")
    : (index + 3) % 3 === 1
    ? palette("blue")
    : palette("green");
};

export const getDefaultAvatarUri = (index: number) => {
  console.log(index);
  return (index + 4) % 4 === 0
    ? defaultPelikoFaceBlueUri
    : (index + 4) % 4 === 1
    ? defaultPelikoFacePinkUri
    : (index + 4) % 4 === 2
    ? defaultPelikoFaceOrangeUri
    : defaultPelikoFaceYellow;
};
