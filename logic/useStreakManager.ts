import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STREAK_KEY = 'culturo_streak';
const LAST_DATE_KEY = 'culturo_last_date';

export function useStreakManager() {
    const [streak, setStreak] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const storedStreak = await AsyncStorage.getItem(STREAK_KEY);
            const storedDate = await AsyncStorage.getItem(LAST_DATE_KEY);

            const today = new Date().toDateString();
            const yesterday = new Date(Date.now() - 86400000).toDateString();

            if (storedDate === today) {
                // déjà joué aujourd’hui, on ne fait rien
                return;
            } else if (storedDate === yesterday) {
                // streak ++
                const newStreak = (parseInt(storedStreak ?? '0') || 0) + 1;
                setStreak(newStreak);
                await AsyncStorage.setItem(STREAK_KEY, newStreak.toString());
                await AsyncStorage.setItem(LAST_DATE_KEY, today);
            } else {
                // streak reset
                setStreak(1);
                await AsyncStorage.setItem(STREAK_KEY, '1');
                await AsyncStorage.setItem(LAST_DATE_KEY, today);
            }
        })();
    }, []);

    return { streak };
}
