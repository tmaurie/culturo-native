import React from "react";
import { View, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";
import Badge from "./Badge";

type Props = {
  streak: number;
};

export default function StreakFlame({ streak }: Props) {
  if (!streak || streak <= 0) return null;

  return (
    <View>
      <Badge
        label={`🔥 ${streak} day streak`}
        backgroundColor="#FF6B00"
        style={{ borderColor: "#ff8837" }}
      />
      <Animatable.Text
        animation="pulse"
        iterationCount="infinite"
        direction="alternate"
        style={styles.emoji}
      ></Animatable.Text>
    </View>
  );
}

const styles = StyleSheet.create({

  emoji: {
    fontSize: 32,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e5b656",
  },
});
