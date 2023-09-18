import React from "react";
import { View, StyleProp, TextStyle, TextInput, ViewStyle } from "react-native";
import { _styles } from "./style";
import Typography from "../Typography";
import colors from "../../constans/colors";
import useDarkMode from "../../hooks/useDarkMode";
import { normalize } from "@/shared/helpers";

interface InputProps {
  placeholder?: string | undefined;
  value: string;
  onChange?: ((text: string) => void) | undefined;
  Icon?: React.JSXElementConstructor<any>;
  IconRight?: React.JSXElementConstructor<any>;
  disabled?: boolean;
  multiline?: boolean | undefined;
  style?: StyleProp<TextStyle> | undefined;
  label?: string | undefined;
  secureTextEntry?: boolean | undefined;
  customStyles?: ViewStyle | undefined
}
export default function Input({
  placeholder,
  value,
  onChange,
  Icon,
  IconRight,
  label,
  secureTextEntry,
  customStyles,
  ...props
}: InputProps) {
  const {isDarkMode} = useDarkMode();

  const styles = _styles(isDarkMode);
  return (
    <View style={[styles.container, customStyles]}>
      {label && (
        <Typography customStyle={styles.label} value={label} />
      )}
      {Icon && (
        <View style={{marginRight: normalize(10)}}>
          <Icon />
        </View>
      )}
      <TextInput
        {...props}
        value={value}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.neutral.darkGray}
        style={[styles.input]}
        placeholder={placeholder}
        onChangeText={onChange}
      />
      {IconRight && (
        <View style={{marginLeft: normalize(10)}}>
          <IconRight />
        </View>
      )}
    </View>
  )
}
