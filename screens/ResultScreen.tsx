import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useXpManager } from "../logic/useXpManager";
import * as Haptics from "expo-haptics";
import Button from "../components/Button";
import { buttonThemes } from "../utils/colors";
import { updateStreak } from "../logic/useStreakManager";
import { PERFECT_BONUS } from "../constants/xp";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export type MainTabsParamList = {
  Home: undefined;
  Quiz: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

type Props = NativeStackScreenProps<RootStackParamList, "Result">;

export default function ResultScreen({ route, navigation }: Props) {
  const { score, xpEarned, totalQuestions } = route.params;
  const bonus = score === totalQuestions ? PERFECT_BONUS : 0;
  const totalXp = xpEarned + bonus;

  const { xp, addXp } = useXpManager();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (xp !== undefined && !added) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      addXp(totalXp);
      setAdded(true);
    }
  }, [xp]);

  useEffect(() => {
    (async () => await updateStreak())();
  }, []);

  const getMessage = () => {
    if (score === 5) return "Perfect ! You're a genius 🤓";
    if (score >= 3) return "Good job! Keep it up! 👍";
    if (score === 2) return "Not bad, but you can do better! 🤔";
    return "You might want to study a bit more! 😅";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Results</Text>
      <Text style={styles.score}>
        Your score: {score} / {totalQuestions}
      </Text>
      <Text style={styles.message}>{getMessage()}</Text>

      <Text style={styles.xp}>+{totalXp} XP</Text>
      {bonus > 0 && (
        <Text style={styles.bonus}>Perfect series bonus! +{bonus} XP</Text>
      )}

      <Button
        label="Back to home"
        onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
        backgroundColor={buttonThemes.primary.bg}
        textColor={buttonThemes.primary.text}
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  score: {
    fontSize: 22,
    marginBottom: 8,
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  xp: {
    fontSize: 20,
    color: "#4dabf7",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#4dabf7",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bonus: {
    fontSize: 16,
    color: "#ffbe0b",
    marginBottom: 24,
  },
});
