import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import * as Haptics from "expo-haptics";
import { buttonThemes } from "../utils/colors";
import { getLevelInfo } from "../constants/xp";

type Props = {
  xp: number;
  xpPerLevel?: number;
};

export default function XpBar({ xp }: Props) {
  const { currentXp, xpForNext } = getLevelInfo(xp);
  const percent = (currentXp / xpForNext) * 100;

  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let hapticInterval: NodeJS.Timeout;

    const animate = () => {
      animatedWidth.setValue(0);

      hapticInterval = setInterval(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }, 80);

      Animated.timing(animatedWidth, {
        toValue: percent,
        duration: 800,
        useNativeDriver: false,
      }).start(() => {
        clearInterval(hapticInterval);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      });
    };

    animate();

    return () => clearInterval(hapticInterval);
  }, [xp]);

  const barWidth = animatedWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Animated.View style={[styles.fill, { width: barWidth }]} />
      </View>
      <Text style={styles.xpText}>
        {currentXp} / {xpForNext} XP
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: "center",
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "600",
  },
  bar: {
    width: "90%",
    height: 18,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  fill: {
    height: "100%",
    backgroundColor: buttonThemes.primary.bg,
    borderRadius: 8,
  },
  xpText: {
    fontFamily: "Fredoka-SemiBold",
    marginTop: 4,
    fontSize: 14,
    color: "#52656D",
    fontWeight: "600",
  },
});
