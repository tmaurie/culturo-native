import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useXpManager } from "../logic/useXpManager";
import XpBar from "../components/XpBar";
import * as Haptics from "expo-haptics";
import Button from "../components/Button";
import Badge from "../components/Badge";
import { buttonThemes } from "../utils/colors";
import { getStreak } from "../logic/useStreakManager";
import StreakFlame from "../components/StreakFlame";
import { FONTS } from "../constants/fonts";
import { COLORS } from "../constants/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { xp } = useXpManager();
  const [streak, setStreak] = useState<number>(0);
  useEffect(() => {
    const fetchStreak = async () => {
      const result = await getStreak();
      setStreak(result.streak ?? 0); // fallback safe
    };

    fetchStreak();
  }, []);

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
          style={{ borderColor: "#4dabf7" }}
        />
        <StreakFlame streak={streak} />
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
    backgroundColor: COLORS.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontFamily: FONTS.heading,
    fontSize: 48,
    color: COLORS.text,
  },
  subtitle: {
    fontFamily: "Fredoka-Bold",
    color: COLORS.text,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  badges: {
    flexDirection: "row",
    marginBottom: 20,
  },
  startButton: {
    marginTop: 10,
    borderColor: "#4dabf7",
  },
});
