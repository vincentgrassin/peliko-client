import * as React from "react";
import Autocomplete, {
  AutocompleteProps
} from "react-native-autocomplete-input";
import { makeStyles } from "react-native-elements";
import { palette, shape } from "../../themeHelpers";

export interface CustomAutocompleteProps<T> extends AutocompleteProps<T> {
  label: string;
}

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: palette("white", 0),
    height: shape.width.autocompleteInput,
    flex: 1
  },
  container: {
    borderWidth: 0,
    borderColor: palette("lightGrey"),
    borderBottomWidth: 1
  }
}));
type Data = any;

const CustomAutocomplete: React.FC<CustomAutocompleteProps<Data>> = ({
  label,
  ...props
}) => {
  const styles = useStyles();
  return (
    <>
      <Autocomplete
        style={styles.root}
        inputContainerStyle={styles.container}
        {...props}
      />
    </>
  );
};

export default CustomAutocomplete;
