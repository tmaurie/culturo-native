import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useXpManager } from "../logic/useXpManager";
import * as Haptics from "expo-haptics";

type Props = NativeStackScreenProps<RootStackParamList, "Result">;

export default function ResultScreen({ route, navigation }: Props) {
  const { score } = route.params;
  const xpEarned = score * 10;

  const { addXp } = useXpManager();

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    addXp(xpEarned);
  }, []);

  const getMessage = () => {
    if (score === 5) return "Parfait ! Tu es un·e génie 🧠";
    if (score >= 3) return "Pas mal du tout ! Continue comme ça 💪";
    if (score === 2) return "Un petit effort encore 🔍";
    return "On a tous un mauvais jour 😅";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résultat</Text>
      <Text style={styles.score}>Tu as eu {score} / 5</Text>
      <Text style={styles.message}>{getMessage()}</Text>

      <Text style={styles.xp}>+{xpEarned} XP</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Retour à l’accueil</Text>
      </TouchableOpacity>
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
});
