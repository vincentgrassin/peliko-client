import React from "react";
import {
  ActivityIndicator as ReactNativeLoader,
  ActivityIndicatorProps as ReactNativeLoaderProps
} from "react-native";
import { palette } from "../../themeHelpers";

interface LoaderProps extends ReactNativeLoaderProps {}

const Loader: React.FC<LoaderProps> = ({ ...props }) => (
  <ReactNativeLoader size="large" color={palette("green")} {...props} />
);

export default Loader;
