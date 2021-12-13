import * as React from "react";
import {
  Divider as ReactNativeDivider,
  DividerProps as ReactNativeDividerProps
} from "react-native-elements";

interface DividerProps extends ReactNativeDividerProps {}

const Divider: React.FC<DividerProps> = ({ ...props }) => (
  <ReactNativeDivider {...props} />
);

export default Divider;
