import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useXpManager } from "../logic/useXpManager";
import XpBar from "../components/XpBar";
import * as Haptics from "expo-haptics";
import Button from "../components/Button";
import { buttonThemes } from "../utils/colors";
import { getStreak } from "../logic/useStreakManager";
import StreakFlame from "../components/StreakFlame";
import { FONTS } from "../constants/fonts";
import { COLORS } from "../constants/colors";
import { getLevelInfo } from "../constants/xp";

type Props = NativeStackScreenProps<RootStackParamList>;

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

  const { level } = getLevelInfo(xp);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Culturo</Text>
        <Text style={styles.subtitle}>
          Test your knowledge with fun quizzes!
        </Text>

        <View style={styles.badges}>
          <StreakFlame streak={streak} />
        </View>
        <Text style={styles.subtitle}>Your Level: {level}</Text>
        <XpBar xp={xp} />

        <Button
          label="Start Quiz"
          onPress={() => {
            Haptics.impactAsync();
            navigation.navigate("Quiz", {});
          }}
          backgroundColor={buttonThemes.primary.bg}
          textColor={buttonThemes.primary.text}
          style={styles.startButton}
        />
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
