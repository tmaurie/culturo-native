import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Question } from "../logic/useQuizEngine";

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
  return (
    <View>
      <Text style={styles.questionText}>{question.question}</Text>

      {question.choices.map((choice, index) => {
        const isSelected = choice === selectedChoice;
        const isTheCorrect = choice === question.answer;

        let buttonStyle = styles.choice;

        if (answered) {
          if (isSelected && isTheCorrect) {
            buttonStyle = styles.correct;
          } else if (isSelected && !isTheCorrect) {
            buttonStyle = styles.incorrect;
          } else if (isTheCorrect) {
            buttonStyle = styles.correct;
          }
        }

        return (
          <TouchableOpacity
            key={index}
            style={buttonStyle}
            onPress={() => onSelect(choice)}
            disabled={answered}
          >
            <Text style={styles.choiceText}>{choice}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  choice: {
    backgroundColor: "#eee",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  correct: {
    backgroundColor: "#b2f2bb",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  incorrect: {
    backgroundColor: "#ffa8a8",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  choiceText: {
    fontSize: 16,
    textAlign: "center",
  },
});
