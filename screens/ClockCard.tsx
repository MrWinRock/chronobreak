import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

interface ClockCardProps {
    city: string;
    time: string | null;
}

const ClockCard: React.FC<ClockCardProps> = ({ city, time = "N/A" }) => {
    return (
        <View style={styles.timeContainer}>
            <Text style={styles.cityName}>{city}</Text>
            <Text style={styles.timeDisplay}>{time}</Text>
        </View>
    );
};

export default ClockCard;
