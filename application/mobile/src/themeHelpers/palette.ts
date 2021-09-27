export const globalPalette = (color: string, opacity?: number): string => {
  if (opacity === undefined) {
    opacity = 1;
  }
  const green = { r: 46, g: 177, b: 152 };
  const red = { r: 242, g: 113, b: 83 };
  const white = { r: 255, g: 255, b: 255 };
  const grey = { r: 70, g: 70, b: 70 };
  const yellow = { r: 247, g: 196, b: 47 };
  const pink = { r: 255, g: 189, b: 203 };
  const black = { r: 32, g: 32, b: 33 };
  const blue = { r: 174, g: 215, b: 230 };
  const lightGrey = { r: 155, g: 155, b: 155 };

  switch (color) {
    case "grey":
      return `rgba(${grey.r},${grey.g},${grey.b},${opacity})`;
    case "lightGrey":
      return `rgba(${lightGrey.r},${lightGrey.g},${lightGrey.b},${opacity})`;
    case "green":
      return `rgba(${green.r},${green.g},${green.b},${opacity})`;
    case "red":
      return `rgba(${red.r},${red.g},${red.b},${opacity})`;
    case "white":
      return `rgba(${white.r},${white.g},${white.b},${opacity})`;
    case "yellow":
      return `rgba(${yellow.r},${yellow.g},${yellow.b},${opacity})`;
    case "pink":
      return `rgba(${pink.r},${pink.g},${pink.b},${opacity})`;
    case "black":
      return `rgba(${black.r},${black.g},${black.b},${opacity})`;
    case "blue":
      return `rgba(${blue.r},${blue.g},${blue.b},${opacity})`;
    default:
      return `rgba(${black.r},${black.g},${black.b},${opacity})`;
  }
};

export default globalPalette;
