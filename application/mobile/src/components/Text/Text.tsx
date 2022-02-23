import * as React from "react";
import {
  makeStyles,
  Text as ReactNativeText,
  TextProps as ReactNativeTextProps
} from "react-native-elements";
import { palette } from "../../themeHelpers";

interface TextProps extends ReactNativeTextProps {
  isError?: boolean;
}
const useStyles = makeStyles(
  (
    theme,
    styleProps: {
      isError: boolean;
    }
  ) => {
    const { isError } = styleProps;
    return {
      textColor: {
        color: isError ? palette("red") : palette("black")
      }
    };
  }
);

const Text: React.FC<TextProps> = ({ isError = false, style, ...props }) => {
  const styles = useStyles({ isError });

  return <ReactNativeText style={[styles.textColor, style]} {...props} />;
};

export default Text;
