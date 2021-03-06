import { Picture } from "../types/types";
import { PICTURE_LEGEND_HEIGHT } from "./constants";

export const computeScrollToValue = (
  pictures: Picture[],
  index: number,
  screenWidth: number
): number => {
  const scrollHeight: number = pictures
    .slice(0, index)
    .map(({ height, width }) => {
      if (height && width) {
        return height * (screenWidth / width) + PICTURE_LEGEND_HEIGHT;
      }
      return 0;
    })
    .reduce((acc, cur) => acc + cur, 0);
  return scrollHeight;
};
