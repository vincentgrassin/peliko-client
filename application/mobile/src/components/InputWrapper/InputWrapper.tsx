import { useFormikContext } from "formik";
import * as React from "react";
import {
  InputProps as ReactNativeInputProps,
  makeStyles
} from "react-native-elements";
import Animated from "react-native-reanimated";
import { shape, typography } from "../../themeHelpers";
import View from "../View";

export interface InputWrapperProps extends ReactNativeInputProps {
  hasStartAdornment?: boolean;
  fullWidth?: boolean;
}

const useStyles = makeStyles((theme, styleProps: { fullWidth: boolean }) => {
  const { fullWidth } = styleProps;

  return {
    input: {
      position: "relative",
      marginTop: shape.spacing(3),
      flex: fullWidth ? 1 : undefined
    }
  };
});

const InputWrapper: React.FC<InputWrapperProps> = ({
  children,
  onFocus,
  hasStartAdornment = false,
  fullWidth = false,
  ...props
}) => {
  const styles = useStyles({ fullWidth });
  const { values } = useFormikContext<unknown>();
  const isReactElement = React.isValidElement(children);

  const isFieldEmpty = (fieldName: string) => {
    //@ts-ignore
    const formValue = values[fieldName];
    if (fieldName === "phoneNumber") {
      return !formValue.value.trim();
    }
    return !formValue;
  };

  const fadeAnim = React.useRef(
    new Animated.Value(
      isFieldEmpty(isReactElement && children.props.fieldName) ? 0 : 1
    )
  ).current;

  const animatedStyle = {
    position: "absolute",
    left: fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: hasStartAdornment ? [150, 8] : [16, 8]
    }),
    top: fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: hasStartAdornment ? [18, -10] : [5, -20]
    }),
    fontSize: fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [typography.fontSize.xm, typography.fontSize.xs]
    })
  };

  const handleFocus = React.useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      easing: (v) => v as any
    }).start();
  }, [fadeAnim]);

  const handleOnChange = React.useCallback(
    (e) => {
      onFocus?.(e);
      handleFocus();
    },
    [onFocus, handleFocus]
  );

  return (
    <View style={styles.input}>
      <Animated.Text
        //@ts-ignore
        style={animatedStyle}
      >
        {isReactElement && children?.props.label}
      </Animated.Text>
      {isReactElement &&
        React.cloneElement(children as React.ReactElement, {
          ...props,
          onFocus: handleOnChange,
          label: (children as React.ReactElement).props.label as string
        })}
    </View>
  );
};

export default InputWrapper;
