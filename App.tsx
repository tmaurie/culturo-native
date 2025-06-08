import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./navigation/MainTabs";
import ResultScreen, { MainTabsParamList } from "./screens/ResultScreen";
import QuizScreen from "./screens/QuizScreen";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

import { ActivityIndicator, View } from "react-native";

export type RootStackParamList = {
  MainTabs: { screen?: keyof MainTabsParamList };
  Quiz: { categoryId?: number };
  Result: { score: number; xpEarned: number; totalQuestions: number };
};


const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Modak-Regular": require("./assets/fonts/Modak-Regular.ttf"),
    "Fredoka-Regular": require("./assets/fonts/Fredoka-Regular.ttf"),
    "Fredoka-Bold": require("./assets/fonts/Fredoka-Bold.ttf"),
    "Fredoka-Medium": require("./assets/fonts/Fredoka-Medium.ttf"),
    "Fredoka-Light": require("./assets/fonts/Fredoka-Light.ttf"),
    "Fredoka-SemiBold": require("./assets/fonts/Fredoka-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar hidden={true} />

      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={MainTabs} />
        <RootStack.Screen name="Quiz" component={QuizScreen} />
        <RootStack.Screen name="Result" component={ResultScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
