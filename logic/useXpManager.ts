import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const XP_KEY = "culturo_xp";

export function useXpManager() {
  const [xp, setXp] = useState<number>(0);

  useEffect(() => {
    AsyncStorage.getItem(XP_KEY).then((value) => {
      if (value) setXp(parseInt(value));
    });
  }, []);

  const addXp = async (amount: number) => {
    const newXp = xp + amount;
    setXp(newXp);
    await AsyncStorage.setItem(XP_KEY, newXp.toString());
  };

  const resetXp = async () => {
    setXp(0);
    await AsyncStorage.removeItem(XP_KEY);
  };

  return { xp, addXp, resetXp };
}
