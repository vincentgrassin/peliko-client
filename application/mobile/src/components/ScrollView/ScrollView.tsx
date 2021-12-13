import * as React from "react";
import {
  ScrollView as ReactNativeScrollView,
  ScrollViewProps as ReactNativeScrollViewProps
} from "react-native";

interface ScrollViewProps extends ReactNativeScrollViewProps {}

const ScrollView: React.FC<ScrollViewProps> = ({ ...props }) => (
  <ReactNativeScrollView {...props} />
);

export default ScrollView;
