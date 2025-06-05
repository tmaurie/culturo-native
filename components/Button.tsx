import React, { useState } from "react";
import { Text, StyleSheet, ViewStyle, Pressable } from "react-native";
import { COLORS } from "../constants/colors";

type Props = {
  label: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  style?: ViewStyle;
};

export default function Button({
  label,
  onPress,
  backgroundColor = "#ff006e",
  textColor = COLORS.background,
  borderColor,
  style,
}: Props) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor },
        { borderColor: borderColor },
        style,
        isPressed ? { transform: [{ translateY: 4 }] } : {},
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 50,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Fredoka-SemiBold",
    textAlign: "center",
    fontSize: 16,
  },
});
