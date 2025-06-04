import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import * as Haptics from "expo-haptics";

type Props = {
  xp: number;
  xpPerLevel?: number;
};

export default function XpBar({ xp, xpPerLevel = 100 }: Props) {
  const level = Math.floor(xp / xpPerLevel);
  const currentXp = xp % xpPerLevel;
  const percent = (currentXp / xpPerLevel) * 100;

  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Lance des petites vibrations répétées pendant le remplissage
    let hapticInterval: NodeJS.Timeout;

    const animate = () => {
      // Reset width
      animatedWidth.setValue(0);

      // Start haptics
      hapticInterval = setInterval(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }, 80);

      // Animate bar
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
      <Text style={styles.label}>Niveau {level}</Text>
      <View style={styles.bar}>
        <Animated.View style={[styles.fill, { width: barWidth }]} />
      </View>
      <Text style={styles.xpText}>
        {currentXp} / {xpPerLevel} XP
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
    height: 16,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    backgroundColor: "#4dabf7",
    borderRadius: 8,
  },
  xpText: {
    marginTop: 4,
    fontSize: 12,
    color: "#555",
  },
});
