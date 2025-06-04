import React from "react";
import { Text, View, StyleSheet } from "react-native";

type Props = {
  label: string;
  color?: string;
  backgroundColor?: string;
};

export default function Badge({
  label,
  color = "#fff",
  backgroundColor = "#4dabf7",
}: Props) {
  return (
    <View style={[styles.badge, { backgroundColor }]}>
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
    borderColor: "#000",
    marginRight: 8,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
});
