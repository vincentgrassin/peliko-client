import React from "react";
//@ts-ignore
import Autocomplete from "react-native-autocomplete-input";

interface AutocompleteProps {
  hideResults: boolean;
  data?: any;
  onChangeText?: (val: any) => void;
  inputContainerStyle?: any;
  defaultValue?: any;
  renderItem?: any;
  flatListProps: {
    renderItem: ({ item }: { item: any }) => JSX.Element;
  };
}

const CustomAutocomplete: React.FC<AutocompleteProps> = ({ ...props }) => {
  return <Autocomplete {...props} />;
};
export default CustomAutocomplete;
