import * as React from "react";
import { Dimensions } from "react-native";
import { Box, Eye, MailBox } from "../../assets";

export const DAYS_IN_SECONDS = 1000 * 60 * 60 * 24;
export const HOURS = 24;
export const screenWidth = Dimensions.get("window").width;
export const screenHeight = Dimensions.get("window").height;
export const defaultCountryCode = "FR";

export const svgMapping: { [key: string]: JSX.Element } = {
  eye: <Eye />,
  box: <Box />,
  mailbox: <MailBox />
};
