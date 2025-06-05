import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Question } from "../logic/useQuizEngine";
import Badge from "./Badge";
import Button from "./Button";
import { getBadgeColor } from "../utils/colors";

type Props = {
  question: Question;
  answered: boolean;
  isCorrect: boolean | null;
  onSelect: (choice: string) => void;
  selectedChoice: string | null;
};

export default function QuestionCard({
  question,
  answered,
  isCorrect,
  onSelect,
  selectedChoice,
}: Props) {
  const getColorForChoice = (choice: string): { bg: string; text: string } => {
    if (!answered) return { bg: "#eee", text: "#000" };
    const isCorrectAnswer = choice === question.answer;
    const isSelectedWrong = choice === selectedChoice && !isCorrectAnswer;

    if (isCorrectAnswer) return { bg: "#06d6a0", text: "#000" }; // vert
    if (isSelectedWrong) return { bg: "#ef476f", text: "#fff" }; // rouge
    return { bg: "#ccc", text: "#666" }; // grisé
  };

  return (
    <View>
      <View style={styles.badgeContainer}>
        <Badge
          label={question.category}
          backgroundColor={getBadgeColor(question.category)}
        />
        <Badge
          label={question.difficulty}
          backgroundColor={getBadgeColor(question.difficulty)}
        />
      </View>

      <Text style={styles.questionText}>{question.question}</Text>

      {question.choices.map((choice, index) => {
        const { bg, text } = getColorForChoice(choice);

        return (
          <Button
            key={index}
            label={choice}
            onPress={() => onSelect(choice)}
            backgroundColor={bg}
            textColor={text}
            style={styles.choice}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
    justifyContent: "center",
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  choice: {
    width: "80%",
    alignSelf: "center",
    marginBottom: 12,
    textAlign: "center",
  },
});
