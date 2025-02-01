import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/styles';

const SelectTimer = ({ onTimeChange }: { onTimeChange: (hour: number, minute: number, second: number) => void }) => {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);
    const seconds = Array.from({ length: 60 }, (_, i) => i);

    const hourScrollRef = useRef<ScrollView>(null);
    const minuteScrollRef = useRef<ScrollView>(null);
    const secondScrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        onTimeChange(hour, minute, second);
    }, [hour, minute, second]);

    const handleScroll = (event: any, type: 'hour' | 'minute' | 'second') => {
        const { contentOffset } = event.nativeEvent;
        const index = Math.round(contentOffset.y / 60);
        if (type === 'hour') {
            setHour(hours[index % 24]);
        } else if (type === 'minute') {
            setMinute(minutes[index % 60]);
        } else {
            setSecond(seconds[index % 60]);
        }
    };

    return (
        <View style={styles.timeSelectorContainer}>
            <View style={styles.hmsContainer}>
                <Text style={styles.hmsText}>Hours</Text>
                <Text style={styles.hmsText}>Minutes</Text>
                <Text style={styles.hmsText}>Seconds</Text>
            </View>
            <View style={styles.wheelContainer}>
                <ScrollView
                    ref={hourScrollRef}
                    style={styles.scrollView}
                    snapToInterval={60}
                    decelerationRate="fast"
                    showsVerticalScrollIndicator={false}
                    onScroll={(event) => handleScroll(event, 'hour')}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {hours.concat(hours).map((h, index) => (
                        <View key={index} style={styles.scrollItem}>
                            <Text style={index % 24 === hour ? styles.selectedItemText : styles.itemText}>
                                {h.toString().padStart(2, '0')}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
                <Text style={styles.colon}>:</Text>
                <ScrollView
                    ref={minuteScrollRef}
                    style={styles.scrollView}
                    snapToInterval={60}
                    decelerationRate="fast"
                    showsVerticalScrollIndicator={false}
                    onScroll={(event) => handleScroll(event, 'minute')}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {minutes.concat(minutes).map((m, index) => (
                        <View key={index} style={styles.scrollItem}>
                            <Text style={index % 60 === minute ? styles.selectedItemText : styles.itemText}>
                                {m.toString().padStart(2, '0')}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
                <Text style={styles.colon}>:</Text>
                <ScrollView
                    ref={secondScrollRef}
                    style={styles.scrollView}
                    snapToInterval={60}
                    decelerationRate="fast"
                    showsVerticalScrollIndicator={false}
                    onScroll={(event) => handleScroll(event, 'second')}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {seconds.concat(seconds).map((s, index) => (
                        <View key={index} style={styles.scrollItem}>
                            <Text style={index % 60 === second ? styles.selectedItemText : styles.itemText}>
                                {s.toString().padStart(2, '0')}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default SelectTimer;
