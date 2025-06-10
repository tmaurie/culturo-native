import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Question } from "../logic/useQuizEngine";
import Badge from "./Badge";
import Button from "./Button";
import {getBadgeColor} from "../utils/colors";
import { COLORS } from "../constants/colors";

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
  const getColorForChoice = (
    choice: string,
  ): { bg: string; text: string; border?: string } => {
    if (!answered)
      return { bg: COLORS.background, text: COLORS.text, border: COLORS.secondary }; // gris
    const isCorrectAnswer = choice === question.answer;
    const isSelectedWrong = choice === selectedChoice && !isCorrectAnswer;

    if (isCorrectAnswer)
      return { bg: COLORS.background, text: COLORS.success, border: COLORS.success }; // vert
    if (isSelectedWrong)
      return { bg: COLORS.background, text: "#EE5555", border: "#EE5555" }; // rouge
    return { bg: COLORS.background, text: COLORS.text, border: COLORS.secondary }; // gris clair
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
        const { bg, text, border } = getColorForChoice(choice);

        return (
          <Button
            key={index}
            label={choice}
            onPress={() => onSelect(choice)}
            backgroundColor={bg}
            textColor={text}
            borderColor={border}
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
    fontFamily: "Fredoka-SemiBold",
    color: COLORS.text,
    fontSize: 20,
    marginBottom: 16,
    textAlign: "center",
  },
  choice: {
    width: "80%",
    alignSelf: "center",
    marginBottom: 12,
    textAlign: "center",
    borderRadius: 20,
  },
});
