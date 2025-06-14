import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

type Props = {
  label: string;
  icon?: string;
  color?: string;
  backgroundColor?: string;
  style?: object;
};

export default function Badge({
  label,
  icon,
  color = "#fff",
  backgroundColor = "#4dabf7",
  style,
}: Props) {
  return (
    <View style={[styles.badge, { backgroundColor }, style]}>
      {icon && (
        <FontAwesome6
          name={icon}
          size={20}
          color={color}
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 8,
  },
  text: {
    fontFamily: "Fredoka-SemiBold",
    fontSize: 16,
    textTransform: "capitalize",
  },
});
