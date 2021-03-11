import React from "react";
import {
  View as ReactNativeView,
  ViewProps as ReactNativeViewProps
} from "react-native";

interface ViewProps extends ReactNativeViewProps {}

const View: React.FC<ViewProps> = ({ ...props }) => (
  <ReactNativeView {...props} />
);

export default View;
