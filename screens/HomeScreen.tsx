import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useXpManager } from "../logic/useXpManager";
import { useStreakManager } from "../logic/useStreakManager";
import XpBar from "../components/XpBar";
import * as Haptics from "expo-haptics";
import Button from "../components/Button";
import { buttonThemes } from "../utils/colors";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { xp } = useXpManager();
  const { streak } = useStreakManager();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to Culturo!</Text>
      <Text>Test your knowledge with fun quizzes!</Text>
      <XpBar xp={xp} />

      <Text>Streak : {streak} 🔥</Text>
      <Button
        label="Start Quiz"
        onPress={() => {
          Haptics.impactAsync();
          navigation.navigate("Quiz");
        }}
        backgroundColor={buttonThemes.primary.bg}
        textColor={buttonThemes.primary.text}
      />
    </View>
  );
}
