import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/styles';

const TimeSelector = ({ onTimeChange }: { onTimeChange: (hour: number, minute: number) => void }) => {
    const [hour, setHour] = useState(12);
    const [minute, setMinute] = useState(30);

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const hourScrollRef = useRef<ScrollView>(null);
    const minuteScrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        onTimeChange(hour, minute);
    }, [hour, minute]);

    useEffect(() => {
        if (hourScrollRef.current) {
            hourScrollRef.current.scrollTo({ y: hour * 60, animated: false });
        }
        if (minuteScrollRef.current) {
            minuteScrollRef.current.scrollTo({ y: minute * 60, animated: false });
        }
    }, []);

    const handleScroll = (event: any, type: 'hour' | 'minute') => {
        const { contentOffset } = event.nativeEvent;
        const index = Math.round(contentOffset.y / 60);
        if (type === 'hour') {
            setHour(hours[index % 24]);
            if (index >= hours.length) {
                hourScrollRef.current?.scrollTo({ y: (index % 24) * 60, animated: false });
            }
        } else {
            setMinute(minutes[index % 60]);
            if (index >= minutes.length) {
                minuteScrollRef.current?.scrollTo({ y: (index % 60) * 60, animated: false });
            }
        }
    };

    return (
        <View style={styles.timeSelectorContainer}>
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
            </View>
        </View>
    );
};

export default TimeSelector;
