import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useXpManager } from "../logic/useXpManager";
import { getLevelInfo } from "../constants/xp";
import XpBar from "../components/XpBar";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function ProfileScreen() {
  const { xp } = useXpManager();
  const { level } = getLevelInfo(xp ?? 0);

  if (xp === undefined) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: COLORS.text }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.level}>Level {level}</Text>
        <XpBar xp={xp} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 36,
    color: COLORS.text,
    marginBottom: 12,
  },
  level: {
    fontFamily: FONTS.bold,
    color: COLORS.text,
    fontSize: 24,
    marginBottom: 12,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
});
