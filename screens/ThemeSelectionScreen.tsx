import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CATEGORIES } from '../logic/categories';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import {COLORS} from "../constants/colors";
import {FontAwesome6} from "@expo/vector-icons";

export default function ThemeSelectionScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleThemeSelect = (categoryId: number) => {
        navigation.navigate('Quiz', { categoryId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choisis ton thème 🧠</Text>
            <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => {
                            handleThemeSelect(item.id);
                         }}
                    >
                        <Text style={styles.cardText}>{item.name}</Text>
                        <FontAwesome6 name={item.fontAwesomeIcon} size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: 16,
    },
    title: {
        color: COLORS.text,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.background,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 3,
        borderColor: COLORS.secondary,
    },
    cardText: {
        color: '#EEE',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
