import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/styles';

const ITEM_HEIGHT = 60;
const BUFFER_COUNT_HOURS = 24 * 3;
const BUFFER_COUNT_MINUTES = 60 * 3;
const CENTER_OFFSET_HOURS = 24;
const CENTER_OFFSET_MINUTES = 60;

const TimeSelector = ({ onTimeChange }: { onTimeChange: (hour: number, minute: number) => void }) => {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);

    const hourScrollRef = useRef<ScrollView>(null);
    const minuteScrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        onTimeChange(hour, minute);
    }, [hour, minute]);

    useEffect(() => {
        hourScrollRef.current?.scrollTo({ y: (CENTER_OFFSET_HOURS + hour) * ITEM_HEIGHT, animated: false });
        minuteScrollRef.current?.scrollTo({ y: (CENTER_OFFSET_MINUTES + minute) * ITEM_HEIGHT, animated: false });
    }, []);

    const handleScroll = (event: any, type: 'hour' | 'minute') => {
        const { contentOffset } = event.nativeEvent;
        const index = Math.round(contentOffset.y / ITEM_HEIGHT);

        if (type === 'hour') {
            let adjustedIndex = ((index % 24) + 24) % 24;
            setHour(adjustedIndex);

            if (index < CENTER_OFFSET_HOURS - 12 || index > CENTER_OFFSET_HOURS + 12) {
                hourScrollRef.current?.scrollTo({ y: (CENTER_OFFSET_HOURS + adjustedIndex) * ITEM_HEIGHT, animated: false });
            }
        } else {
            let adjustedIndex = ((index % 60) + 60) % 60;
            setMinute(adjustedIndex);

            if (index < CENTER_OFFSET_MINUTES - 30 || index > CENTER_OFFSET_MINUTES + 30) {
                minuteScrollRef.current?.scrollTo({ y: (CENTER_OFFSET_MINUTES + adjustedIndex) * ITEM_HEIGHT, animated: false });
            }
        }
    };

    const generateLoopedArray = (max: number, bufferCount: number) => {
        return Array.from({ length: bufferCount }, (_, i) => (i % max));
    };

    return (
        <View style={styles.timeSelectorContainer}>
            <View style={styles.wheelContainer}>
                <ScrollView
                    ref={hourScrollRef}
                    style={styles.scrollView}
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    showsVerticalScrollIndicator={false}
                    onScroll={(event) => handleScroll(event, 'hour')}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {generateLoopedArray(24, BUFFER_COUNT_HOURS).map((h, index) => (
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
                    snapToInterval={ITEM_HEIGHT}
                    decelerationRate="fast"
                    showsVerticalScrollIndicator={false}
                    onScroll={(event) => handleScroll(event, 'minute')}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.scrollViewContent}
                >
                    {generateLoopedArray(60, BUFFER_COUNT_MINUTES).map((m, index) => (
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
