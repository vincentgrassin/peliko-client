import React from "react";
import {
  Button as ReactNativeButton,
  ButtonProps as ReactNativeButtonProps,
  makeStyles
} from "react-native-elements";
import { shape, palette, typography } from "../../themeHelpers";

interface ButtonProps extends ReactNativeButtonProps {
  size?: "small" | "large";
}

const useStyles = makeStyles(
  (
    theme,
    styleProps: {
      size: "large" | "small";
      type: "outline" | "solid" | "clear" | undefined;
    }
  ) => {
    const { size, type } = styleProps;
    return {
      button: {
        borderRadius: shape.radius[30],
        borderWidth: shape.width.buttonBorder,
        borderColor: palette("yellow"),
        height: size === "large" ? 50 : 25,
        paddingLeft: shape.spacing(2),
        paddingRight: shape.spacing(2),
        backgroundColor:
          type === "outline" ? palette("white") : palette("yellow")
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
  ...props
}) => {
  const styles = useStyles({ size, type });

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
