import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTimeByCity } from '../utils/TimeUtils';
import TimeSelector from '../components/TimeSelector';
import styles from '../styles/styles';

export default function TimeZoneConverter() {
    const [cities, setCities] = useState<{ city: string, country: string }[]>([]);
    const [selectedCity, setSelectedCity] = useState<string | null>('Bangkok');
    const [selectedTime, setSelectedTime] = useState<Date>(new Date());
    const [convertedTimes, setConvertedTimes] = useState<Record<string, string | null>>({});

    useEffect(() => {
        const loadCities = async () => {
            const storedCities = await AsyncStorage.getItem('addedCities');
            if (storedCities) {
                setCities(JSON.parse(storedCities));
            }
        };
        loadCities();
    }, []);

    useEffect(() => {
        if (selectedCity) {
            const newConvertedTimes: Record<string, string | null> = {};
            cities.forEach(city => {
                const time = getTimeByCity(city.city, city.country, selectedTime);
                newConvertedTimes[city.city] = time;
            });
            setConvertedTimes(newConvertedTimes);
        }
    }, [selectedCity, selectedTime, cities]);

    const handleTimeChange = (hour: number, minute: number) => {
        const updatedTime = new Date(selectedTime);
        updatedTime.setHours(hour);
        updatedTime.setMinutes(minute);
        setSelectedTime(updatedTime);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Time Zone Converter</Text>
            </View>
            <View style={styles.timeSelectorContainer}>
                <TimeSelector onTimeChange={handleTimeChange} />
            </View>
            <ScrollView>
                <View style={styles.timezoneContainer}>
                    {Object.entries(convertedTimes).map(([city, time]) => (
                        <View key={city} style={styles.convertedTimeContainer}>
                            <Text style={styles.convertedText}>{city}</Text>
                            <Text style={styles.convertedTime}>{time}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
