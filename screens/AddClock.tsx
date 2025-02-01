import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';
import { citiesData } from '../data/cities';

export default function AddClock({ navigation, route }: any) {
    const [addedCities, setAddedCities] = useState<{ city: string, country: string }[]>([]);
    const { fromScreen } = route.params;

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
        navigation.navigate(fromScreen, { city, country });
    };

    return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={{ backgroundColor: "transparent", paddingRight: 20 }} onPress={() => navigation.goBack()}>
                <Text style={{ fontSize: 36, color: "#fff", fontWeight: 500, textAlign: "right" }}>Cancel</Text>
            </TouchableOpacity>
            <View style={{ marginBottom: 100 }}>
                {availableCities.map((city, index) => (
                    <TouchableOpacity key={index} style={styles.cityItem} onPress={() => addCity(city.city, city.country)}>
                        <Text style={styles.cityName}>{city.city}, {city.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}