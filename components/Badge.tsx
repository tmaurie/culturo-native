import React from "react";
import { Text, View, StyleSheet } from "react-native";

type Props = {
  label: string;
  color?: string;
  backgroundColor?: string;
  style?: object;
};

export default function Badge({
  label,
  color = "#fff",
  backgroundColor = "#4dabf7",
  style,
}: Props) {
  return (
    <View style={[styles.badge, { backgroundColor }, style]}>
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 2,
    marginRight: 8,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  text: {
    fontFamily: "Fredoka-SemiBold",
    fontSize: 16,
    textTransform: "capitalize",
  },
});
