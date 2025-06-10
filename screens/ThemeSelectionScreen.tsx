import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CATEGORIES } from '../logic/categories';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import {COLORS} from "../constants/colors";
import ThemeCard from '../components/ThemeCard';

export default function ThemeSelectionScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleThemeSelect = (categoryId: number) => {
        navigation.navigate('Quiz', { categoryId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose a Theme</Text>
            <FlatList
                data={CATEGORIES.sort((a, b) => a.name > b.name ? 1 : -1)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ThemeCard item={item} onPress={() => handleThemeSelect(item.id)} />
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
        marginTop: 64,
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
