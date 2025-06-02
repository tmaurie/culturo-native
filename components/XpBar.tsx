import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
    xp: number;
    xpPerLevel?: number; // ex: 100 XP = 1 niveau
};

export default function XpBar({ xp, xpPerLevel = 100 }: Props) {
    const level = Math.floor(xp / xpPerLevel);
    const currentXp = xp % xpPerLevel;
    const percent = (currentXp / xpPerLevel) * 100;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Niveau {level}</Text>
            <View style={styles.bar}>
                <View style={[styles.fill, { width: `${percent}%` }]} />
            </View>
            <Text style={styles.xpText}>{currentXp} / {xpPerLevel} XP</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        alignItems: 'center',
        width: '100%',
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
        fontWeight: '600',
    },
    bar: {
        width: '90%',
        height: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        backgroundColor: '#4dabf7',
    },
    xpText: {
        marginTop: 4,
        fontSize: 12,
        color: '#555',
    },
});
