import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import {COLORS} from "../constants/colors";
import {FontAwesome6} from "@expo/vector-icons";

type Props = {
    item: {
        name: string;
        fontAwesomeIcon: string;
    }
    onPress: () => void;
};

export default function ThemeCard({ item, onPress }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
            <FontAwesome6 name={item.fontAwesomeIcon} size={24} color={COLORS.primary} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.background,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1.5,
        borderBottomWidth : 5,
        borderColor: COLORS.secondary,
    },
    cardText: {
        color: '#EEE',
        fontSize: 16,
        fontWeight: 'bold',
    },
    accentBar: {
        width: "100%",
        height: 8,
        backgroundColor: '#393E46',
        borderRadius: 8,
        marginRight: 12,
    },
});
