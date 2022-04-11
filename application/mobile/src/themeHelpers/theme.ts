import { globalPalette } from "./palette";
import typography from "./typography";

const globalTheme = {
  Button: {
    titleStyle: [
      {
        fontFamily: "WorkSansRegular",
        fontSize: typography.fontSize.xm,
      },
    ],
  },
  Input: {
    labelStyle: [
      {
        fontFamily: "Windsor",
        fontSize: typography.fontSize.xm,
      },
    ],
    errorStyle: [
      {
        color: globalPalette("red"),
      },
    ],
    errorProps: [
      {
        fontFamily: "WorkSansRegular",
        fontSize: typography.fontSize.s,
      },
    ],
  },
  Text: {
    h1Style: {
      fontFamily: "Windsor",
      fontWeight: "normal",
      fontSize: typography.fontSize.xl,
    },
    h2Style: {
      fontFamily: "Windsor",
      fontWeight: "normal",
      fontSize: typography.fontSize.m,
    },
    h3Style: {
      fontFamily: "WorkSansRegular",
      fontWeight: "normal",
      fontSize: typography.fontSize.xm,
    },
    style: {
      fontFamily: "WorkSansRegular",
      fontSize: typography.fontSize.s,
    },
  },
};

export default globalTheme;
