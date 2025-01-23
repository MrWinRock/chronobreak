import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WorldClock from '../screens/WorldClock';
import AddClock from '../screens/AddClock';

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator initialRouteName="WorldClock" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WorldClock" component={WorldClock} options={{ title: 'World Clock' }} />
            <Stack.Screen name="AddClock" component={AddClock} options={{ title: 'Add Clock' }} />
        </Stack.Navigator>
    );
}
