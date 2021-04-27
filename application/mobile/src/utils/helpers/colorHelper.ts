import { palette } from "../../themeHelpers";

export const getThumbnailRollColor = (index: number) => {
  return (index + 3) % 3 === 0
    ? palette("yellow")
    : (index + 3) % 3 === 1
    ? palette("blue")
    : palette("green");
};
