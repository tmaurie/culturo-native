import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useQuizEngine } from "../logic/useQuizEngine";
import QuestionCard from "../components/QuestionCard";
import * as Haptics from "expo-haptics";
import Button from "../components/Button";
import { buttonThemes } from "../utils/colors";
import {COLORS} from "../constants/colors";

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

  useEffect(() => {
    if (quizFinished) {
      navigation.replace("Result", { score });
    }
  }, [quizFinished]);

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
        <Text>Loading questions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Question {currentIndex + 1} of {totalQuestions}
      </Text>

      <QuestionCard
        question={currentQuestion}
        answered={answered}
        isCorrect={isCorrect}
        selectedChoice={selectedChoice}
        onSelect={handleAnswer}
      />

      {answered && (
        <Button
          label="Next Question"
          onPress={() => {
            Haptics.impactAsync();
            setSelectedChoice(null);
            next();
          }}
          backgroundColor={buttonThemes.primary.bg}
          textColor={buttonThemes.primary.text}
          style={styles.nextButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor : COLORS.background
  },
  progress: {
    color: COLORS.text,
    fontFamily : "Fredoka-Bold",
    fontSize: 18,
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
  nextButton: {
    alignSelf: "center",
    marginTop: 20,
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
