import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

export default function Stopwatch() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Stopwatch</Text>
        </View>
    );
}
