import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import { citiesData } from '../data/cities';

export default function AddClock({ navigation }: any) {
    const [addedCities, setAddedCities] = useState<{ city: string, country: string }[]>([]);

    useEffect(() => {
        const loadAddedCities = async () => {
            const storedCities = await AsyncStorage.getItem('addedCities');
            if (storedCities) {
                setAddedCities(JSON.parse(storedCities));
            }
        };
        loadAddedCities();
    }, []);

    const availableCities = citiesData.filter(
        (city) => !addedCities.some((addedCity) => addedCity.city === city.city)
    );

    const addCity = async (city: string, country: string) => {
        const newCities = [...addedCities, { city, country }];
        await AsyncStorage.setItem('addedCities', JSON.stringify(newCities));
        navigation.navigate('WorldClock', { city, country });
    };

    return (
        <ScrollView style={styles.container}>
            {availableCities.map((city, index) => (
                <TouchableOpacity key={index} style={styles.cityItem} onPress={() => addCity(city.city, city.country)}>
                    <Text style={styles.cityName}>{city.city}, {city.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}