import React from "react";
import {
  FlatList as ReactNativeFlatList,
  FlatListProps as ReactNativeFlatListProps
} from "react-native";

interface FlatListProps<T> extends ReactNativeFlatListProps<T> {}

const FlatList: React.FC<FlatListProps<React.ReactElement>> = ({
  ...props
}) => <ReactNativeFlatList {...props} />;

export default FlatList;
