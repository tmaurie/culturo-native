import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useQuizEngine } from "../logic/useQuizEngine";
import QuestionCard from "../components/QuestionCard";
import * as Haptics from "expo-haptics";

type Props = NativeStackScreenProps<RootStackParamList, "Quiz">;

export default function QuizScreen({ navigation }: Props) {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    score,
    answered,
    isCorrect,
    quizFinished,
    answer,
    next,
  } = useQuizEngine(5);

  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const handleAnswer = (choice: string) => {
    setSelectedChoice(choice);
    const isGood = choice === currentQuestion.answer;

    if (isGood) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    answer(choice);
  };

  if (!currentQuestion) {
    return (
      <View style={styles.center}>
        <Text>Chargement des questions...</Text>
      </View>
    );
  }

  if (quizFinished) {
    navigation.replace("Result", { score });
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Question {currentIndex + 1} / {totalQuestions}
      </Text>

      <QuestionCard
        question={currentQuestion}
        answered={answered}
        isCorrect={isCorrect}
        selectedChoice={selectedChoice}
        onSelect={handleAnswer}
      />

      {answered && (
        <TouchableOpacity style={styles.nextButton} onPress={next}>
          <Text style={styles.nextText}>Suivant</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  progress: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: "center",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  choice: {
    backgroundColor: "#eee",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  choiceText: {
    fontSize: 16,
    textAlign: "center",
  },
  correct: {
    backgroundColor: "#b2f2bb",
  },
  incorrect: {
    backgroundColor: "#ffa8a8",
  },
  nextButton: {
    marginTop: 24,
    backgroundColor: "#4dabf7",
    padding: 16,
    borderRadius: 8,
    alignSelf: "center",
  },
  nextText: {
    color: "#fff",
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
