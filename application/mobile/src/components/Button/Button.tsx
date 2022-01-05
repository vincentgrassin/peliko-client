import * as React from "react";
import {
  Button as ReactNativeButton,
  ButtonProps as ReactNativeButtonProps,
  makeStyles
} from "react-native-elements";
import { shape, palette, typography } from "../../themeHelpers";
import { Colors } from "../../utils/types/types";

interface ButtonProps extends ReactNativeButtonProps {
  size?: "small" | "large";
  color?: Colors;
}

const useStyles = makeStyles(
  (
    theme,
    styleProps: {
      size: "large" | "small";
      type: "outline" | "solid" | "clear" | undefined;
      color: string | undefined;
    }
  ) => {
    const { size, type, color } = styleProps;
    return {
      button: {
        borderRadius: shape.radius[30],
        borderWidth: shape.width.buttonBorder,
        borderColor: color || palette("yellow"),
        height: size === "large" ? 50 : 25,
        paddingTop: shape.spacing(0),
        paddingBottom: shape.spacing(0),
        paddingLeft: shape.spacing(2),
        paddingRight: shape.spacing(2),
        backgroundColor:
          color || (type === "outline" ? palette("white") : palette("yellow"))
      },
      buttonTitle: {
        color: type === "outline" ? palette("yellow") : palette("black"),
        fontSize:
          size === "small" ? typography.fontSize.xs : typography.fontSize.s
      }
    };
  }
);

const Button: React.FC<ButtonProps> = ({
  type = "solid",
  buttonStyle,
  titleStyle,
  size = "large",
  color,
  ...props
}) => {
  const styles = useStyles({ size, type, color });

  return (
    <ReactNativeButton
      buttonStyle={[styles.button, buttonStyle]}
      titleStyle={[styles.buttonTitle, titleStyle]}
      type={type}
      {...props}
    />
  );
};

export default Button;
