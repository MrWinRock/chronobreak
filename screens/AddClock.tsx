import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TextInput, Button, ScrollView } from 'react-native';
import styles from '../styles/styles';
import { getAllCitiesTime } from '../utils/TimeUtils';
import { popularCities } from '../data/Zone';
import ClockCard from './ClockCard';

const Stack = createStackNavigator();

function AddCityScreen({ navigation }: any) {
    const [newCity, setNewCity] = useState<string>('');
    const [newCountry, setNewCountry] = useState<string>('');

    const addCity = () => {
        if (newCity && newCountry) {
            navigation.navigate('ClockList', { city: newCity, country: newCountry });
            setNewCity('');
            setNewCountry('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="City"
                value={newCity}
                onChangeText={setNewCity}
            />
            <TextInput
                style={styles.input}
                placeholder="Country Code"
                value={newCountry}
                onChangeText={setNewCountry}
            />
            <Button title="Add City" onPress={addCity} />
        </View>
    );
}

function ClockListScreen({ route }: any) {
    const [cityTimes, setCityTimes] = useState<Record<string, string | null>>({});

    React.useEffect(() => {
        const times = getAllCitiesTime(popularCities);
        setCityTimes(times);
    }, []);

    React.useEffect(() => {
        if (route.params?.city && route.params?.country) {
            const updatedCities = [...popularCities, { city: route.params.city, country: route.params.country }];
            const times = getAllCitiesTime(updatedCities);
            setCityTimes(times);
        }
    }, [route.params?.city, route.params?.country]);

    return (
        <ScrollView style={styles.container}>
            {Object.entries(cityTimes).map(([city, time]) => (
                <ClockCard key={city} city={city} time={time} />
            ))}
        </ScrollView>
    );
}

export default function AddClock() {
    return (
        <Stack.Navigator initialRouteName="ClockList">
            <Stack.Screen name="ClockList" component={ClockListScreen} />
            <Stack.Screen name="AddCity" component={AddCityScreen} />
        </Stack.Navigator>
    );
}
