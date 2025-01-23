import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { getAllCitiesTime } from '../utils/TimeUtils';
import { popularCities } from '../data/Zone';
import ClockCard from './ClockCard';
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/styles';

type RootStackParamList = {
    AddClock: undefined;
};

export default function WorldClock() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [cityTimes, setCityTimes] = useState<Record<string, string | null>>({});

    useEffect(() => {
        const times = getAllCitiesTime(popularCities);
        setCityTimes(times);
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>World Clock</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddClock')}>
                        <Ionicons name="add-outline" style={styles.headerButtonText}></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('AddClock')}>
                        <Ionicons name="trash-bin-outline" style={styles.headerButtonText}></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
            {Object.entries(cityTimes).map(([city, time]) => (
                <ClockCard key={city} city={city} time={time} />
            ))}
        </ScrollView>
    );
}
