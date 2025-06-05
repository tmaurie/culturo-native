import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type QuizNode = {
  id: string;
  label: string;
  status: "locked" | "unlocked" | "completed";
  icon?: string;
};

type RootStackParamList = {
  Quiz: { quizId: string };
  // Add other routes here if needed
};

const quizPath: QuizNode[] = [
  { id: "1", label: "Intro", status: "completed", icon: "🎓" },
  { id: "2", label: "Général", status: "completed", icon: "🌍" },
  { id: "3", label: "Cinéma", status: "unlocked", icon: "🎬" },
  { id: "4", label: "Questions difficiles", status: "locked", icon: "🔥" },
  { id: "5", label: "Histoire", status: "locked", icon: "🏛️" },
];

export default function ProgressPathScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (node: QuizNode) => {
    if (node.status === "unlocked") {
      navigation.navigate("Quiz", { quizId: node.id });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ton parcours 🧠</Text>

      <FlatList
        data={quizPath}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const statusStyle = {
            completed: styles.nodeCompleted,
            unlocked: styles.nodeUnlocked,
            locked: styles.nodeLocked,
          }[item.status];

          return (
            <TouchableOpacity
              onPress={() => handlePress(item)}
              disabled={item.status !== "unlocked"}
              style={[styles.node, statusStyle]}
            >
              <Text style={styles.icon}>{item.icon || "❓"}</Text>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.status}>{item.status.toUpperCase()}</Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.path}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff8f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  path: {
    alignItems: "center",
  },
  node: {
    width: 200,
    padding: 16,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: "#000",
    marginBottom: 20,
    alignItems: "center",
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  status: {
    marginTop: 4,
    fontSize: 12,
    color: "#666",
  },
  nodeCompleted: {
    backgroundColor: "#06d6a0",
  },
  nodeUnlocked: {
    backgroundColor: "#ffbe0b",
  },
  nodeLocked: {
    backgroundColor: "#ccc",
  },
});
