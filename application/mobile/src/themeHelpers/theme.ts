import { globalPalette } from "./palette";
import shape from "./shape";
import typography from "./typography";

const globalTheme = {
  Button: {
    titleStyle: [
      {
        fontFamily: "WorkSansRegular",
        fontSize: typography.fontSize.xm,
        fontWeight: "bold"
      }
    ]
  },
  Input: {
    labelStyle: [
      {
        fontFamily: "Windsor",
        fontSize: typography.fontSize.xm
      }
    ]
  },
  Text: {
    h1Style: {
      fontFamily: "Windsor",
      fontWeight: "normal",
      fontSize: typography.fontSize.xl
    },
    h2Style: {
      fontFamily: "Windsor",
      fontWeight: "normal",
      fontSize: typography.fontSize.m
    },
    h3Style: {
      fontFamily: "WorkSansRegular",
      fontWeight: "normal",
      fontSize: typography.fontSize.xm
    },
    style: {
      fontFamily: "WorkSansRegular",
      fontSize: typography.fontSize.s
    }
  }
};

export default globalTheme;
