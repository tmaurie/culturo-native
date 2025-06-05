import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useXpManager } from "../logic/useXpManager";
import { useStreakManager } from "../logic/useStreakManager";
import XpBar from "../components/XpBar";
import * as Haptics from "expo-haptics";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { buttonThemes } from "../utils/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { xp } = useXpManager();
  const { streak } = useStreakManager();

  if (xp === undefined || streak === undefined) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const level = Math.floor(xp / 100);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Culturo</Text>
      <Text style={styles.subtitle}>Test your knowledge with fun quizzes!</Text>

      <View style={styles.badges}>
        <Badge
          label={`Level ${level}`}
          backgroundColor={buttonThemes.primary.bg}
        />
        <Badge
          label={`${streak} day streak`}
          backgroundColor={buttonThemes.warning.bg}
          color={buttonThemes.warning.text}
        />
      </View>

      <XpBar xp={xp} />

      <Button
        label="Start Quiz"
        onPress={() => {
          Haptics.impactAsync();
          navigation.navigate("Quiz");
        }}
        backgroundColor={buttonThemes.primary.bg}
        textColor={buttonThemes.primary.text}
        style={styles.startButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  badges: {
    flexDirection: "row",
    marginBottom: 20,
  },
  startButton: {
    marginTop: 10,
  },
});
