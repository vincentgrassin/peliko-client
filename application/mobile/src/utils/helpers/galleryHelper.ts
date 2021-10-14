import { Picture } from "../types/types";

export const computeScrollToValue = (
  pictures: Picture[],
  index: number,
  screenWidth: number
): number => {
  const scrollHeight: number = pictures
    .slice(0, index)
    .map(({ height, width }) => {
      if (height && width) {
        return height * (screenWidth / width);
      }
      return 0;
    })
    .reduce((acc, cur) => acc + cur, 0);
  return scrollHeight;
};
