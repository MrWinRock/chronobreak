import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/styles';
import { getTimeByCountry } from '../utils/TimeUtils';
import { popularCountryCodes } from '../data/Zone';

export default function WorldClock() {
    const [countryTimes, setCountryTimes] = useState<Record<string, string | null>>({});

    useEffect(() => {
        const times: Record<string, string | null> = {};
        popularCountryCodes.forEach(countryCode => {
            times[countryCode] = getTimeByCountry(countryCode);
        });
        setCountryTimes(times);
    }, []);

    return (
        <ScrollView style={styles.container}>
            {Object.entries(countryTimes).map(([countryCode, time]) => (
                <View key={countryCode} style={styles.timeContainer}>
                    <Text style={styles.countryCode}>{countryCode}</Text>
                    <Text style={styles.time}>{time}</Text>
                </View>
            ))}
        </ScrollView>
    );
}
