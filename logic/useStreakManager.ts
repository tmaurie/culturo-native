import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

const STREAK_KEY = "culturo_streak";

export const getStreak = async () => {
  const data = await AsyncStorage.getItem(STREAK_KEY);

  if (!data) {
    return { streak: 0, lastPlayed: null };
  }

  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Erreur parsing streak :", e);
    return { streak: 0, lastPlayed: null };
  }
};

export const updateStreak = async () => {
  const today = dayjs().startOf("day");
  const { streak, lastPlayed } = await getStreak();

  const last = lastPlayed ? dayjs(lastPlayed) : null;

  let newStreak = 1;

  if (last) {
    if (today.diff(last, "day") === 1) {
      newStreak = streak + 1;
    } else if (today.isSame(last, "day")) {
      newStreak = streak; // déjà joué aujourd’hui
    }
  }

  await AsyncStorage.setItem(
    STREAK_KEY,
    JSON.stringify({ streak: newStreak, lastPlayed: today.toISOString() }),
  );

  return newStreak;
};
