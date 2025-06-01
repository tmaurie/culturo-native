import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useXpManager } from '../logic/useXpManager';
import { useStreakManager } from '../logic/useStreakManager';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    const { xp } = useXpManager();
    const { streak } = useStreakManager();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>XP actuel : {xp}</Text>
            <Text>Streak : {streak} 🔥</Text>
            <Button title="Commencer le quiz" onPress={() => navigation.navigate('Quiz')} />
        </View>
    );
}
