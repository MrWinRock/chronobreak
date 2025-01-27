import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/styles';

const TimeSelector = ({ onTimeChange }: { onTimeChange: (hour: number, minute: number) => void }) => {
    const [hour, setHour] = useState(12);
    const [minute, setMinute] = useState(30);

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    useEffect(() => {
        onTimeChange(hour, minute);
    }, [hour, minute]);

    const handleScroll = (event: any, type: 'hour' | 'minute') => {
        const { contentOffset } = event.nativeEvent;
        const index = Math.round(contentOffset.y / 40); // Assuming each item height is 40
        if (type === 'hour') {
            setHour(hours[index]);
        } else {
            setMinute(minutes[index]);
        }
    };

    return (
        <View style={styles.timeSelectorContainer}>
            <View style={styles.wheelContainer}>
                <ScrollView
                    style={styles.scrollView}
                    snapToInterval={40}
                    decelerationRate="fast"
                    showsVerticalScrollIndicator={false}
                    onScroll={(event) => handleScroll(event, 'hour')}
                    scrollEventThrottle={16}
                >
                    {hours.map((h, index) => (
                        <View key={index} style={styles.scrollItem}>
                            <Text style={styles.itemText}>{h.toString().padStart(2, '0')}</Text>
                        </View>
                    ))}
                </ScrollView>
                <Text style={styles.colon}>:</Text>
                <ScrollView
                    style={styles.scrollView}
                    snapToInterval={40}
                    decelerationRate="fast"
                    showsVerticalScrollIndicator={false}
                    onScroll={(event) => handleScroll(event, 'minute')}
                    scrollEventThrottle={16}
                >
                    {minutes.map((m, index) => (
                        <View key={index} style={styles.scrollItem}>
                            <Text style={styles.itemText}>{m.toString().padStart(2, '0')}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default TimeSelector;
