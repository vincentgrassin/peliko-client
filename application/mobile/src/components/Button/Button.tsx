import React from "react";
import {
  Button as ReactNativeButton,
  ButtonProps as ReactNativeButtonProps
} from "react-native-elements";
import { shape, palette } from "../../themeHelpers";
import StyleSheet from "../StyleSheet";

interface ButtonProps extends ReactNativeButtonProps {}

const style = StyleSheet.create({
  button: {
    borderRadius: shape.radius[30],
    borderWidth: shape.width.buttonBorder,
    borderColor: palette("yellow"),
    height: 50
  },
  solidButton: {
    backgroundColor: palette("yellow")
  },
  outlinedButton: {
    backgroundColor: palette("white")
  },
  solidTitle: {
    color: palette("black")
  },
  outlinedTitle: {
    color: palette("yellow")
  }
});

const Button: React.FC<ButtonProps> = ({
  type,
  buttonStyle,
  titleStyle,
  ...props
}) => (
  <ReactNativeButton
    buttonStyle={[
      style.button,
      type === "outline" ? style.outlinedButton : style.solidButton,
      buttonStyle
    ]}
    titleStyle={[
      type === "outline" ? style.outlinedTitle : style.solidTitle,
      titleStyle
    ]}
    type={type}
    {...props}
  />
);

export default Button;
