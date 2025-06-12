import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
    title: string;
    onBack?: () => void;
    rightIcon?: string;
    onRightPress?: () => void;
};

export default function Header({ title, onBack, rightIcon, onRightPress }: Props) {
    return (
        <View style={styles.container}>
            {onBack ? (
                <TouchableOpacity onPress={onBack} style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={24} color="#FFD93D" />
                </TouchableOpacity>
            ) : <View style={styles.iconButton} />}

            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.accentBar} />
            </View>

            {rightIcon ? (
                <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
                    <Ionicons name={rightIcon as any} size={24} color="#FFD93D" />
                </TouchableOpacity>
            ) : <View style={styles.iconButton} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 12,
        backgroundColor: '#222831',
        borderBottomWidth: 3,
        borderBottomColor: '#FFD93D',
    },
    iconButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        color: '#FFD93D',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    accentBar: {
        marginTop: 4,
        width: 40,
        height: 4,
        backgroundColor: '#00ADB5',
        borderRadius: 2,
    },
});
