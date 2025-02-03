import React, { useEffect, useState } from 'react';
import { useNavigation, NavigationProp, useIsFocused } from '@react-navigation/native';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Modal } from 'react-native';
import styles from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddAlarm from './AddAlarm';
import AlarmCard from '../components/AlarmCard';
import { Audio } from 'expo-av';

type RootStackParamList = {
    AddAlarm: { fromScreen: string };
};

export default function Alarm() {
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [alarms, setAlarms] = useState<{ time: string, name: string, sound: boolean, vibration: boolean, isEnabled: boolean }[]>([]);
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false);
    const [deletingAlarm, setDeletingAlarm] = useState<string | null>(null);
    const [showDeleteButtons, setShowDeleteButtons] = useState(false);
    const [sound, setSound] = useState<Audio.Sound | null>(null);

    useEffect(() => {
        const loadAlarms = async () => {
            const storedAlarms = await AsyncStorage.getItem('alarms');
            if (storedAlarms) {
                setAlarms(JSON.parse(storedAlarms));
            }
        };
        if (isFocused) {
            loadAlarms();
        }
    }, [isFocused]);

    useEffect(() => {
        const checkAlarms = async () => {
            const now = new Date();
            const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
            console.log("Now: ", currentTime);
            alarms.forEach(async (alarm) => {
                if (alarm.isEnabled && alarm.time === currentTime) {
                    console.log('Alarm triggered: ', alarm);
                    if (alarm.sound) {
                        console.log('Playing sound');
                        await playSound();
                        alarm.isEnabled = false;
                    }
                }
            });
        };

        const interval = setInterval(checkAlarms, 10000); // [TBD] Check every 10 seconds
        return () => clearInterval(interval);
    }, [alarms]);

    const playSound = async () => {
        const { sound } = await Audio.Sound.createAsync(
            require('../assets/alarm-sound.mp3')
        );
        setSound(sound);
        await sound.playAsync();
    };

    const saveAlarm = async (time: string, name: string, sound: boolean, vibration: boolean) => {
        const newAlarm = { time, name, sound, vibration, isEnabled: false };
        const newAlarms = [...alarms, newAlarm];
        setAlarms(newAlarms);
        await AsyncStorage.setItem('alarms', JSON.stringify(newAlarms));
        console.log('Alarm saved: ', newAlarm);
    };

    const toggleDeleteButtons = () => {
        setShowDeleteButtons(!showDeleteButtons);
        setDeletingAlarm(null);
    };

    const handleDeleteAlarm = async (time: string) => {
        const newAlarms = alarms.filter((alarm) => alarm.time !== time);
        await AsyncStorage.setItem('alarms', JSON.stringify(newAlarms));
        setAlarms(newAlarms);
        setDeletingAlarm(null);
        setShowDeleteButtons(false);
    };

    const toggleAlarm = async (time: string) => {
        const newAlarms = alarms.map((alarm) =>
            alarm.time === time ? { ...alarm, isEnabled: !alarm.isEnabled } : alarm
        );
        setAlarms(newAlarms);
        console.log('Alarms: ', newAlarms);
        await AsyncStorage.setItem('alarms', JSON.stringify(newAlarms));
    };

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { }} />}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Alarm</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.headerButton} onPress={() => setModalVisible(true)}>
                        <Ionicons name="add-outline" style={styles.headerButtonText}></Ionicons>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerButton} onPress={toggleDeleteButtons}>
                        <Ionicons name="trash-bin-outline" style={styles.headerButtonText}></Ionicons>
                    </TouchableOpacity>
                </View>
            </View>
            {alarms.map((alarm, index) => (
                <AlarmCard
                    key={index}
                    time={alarm.time}
                    name={alarm.name}
                    sound={alarm.sound}
                    vibration={alarm.vibration}
                    deleting={deletingAlarm === alarm.time}
                    onConfirmDelete={() => handleDeleteAlarm(alarm.time)}
                    showDeleteButton={showDeleteButtons}
                    isEnabled={alarm.isEnabled}
                    toggleSwitch={() => toggleAlarm(alarm.time)}
                />
            ))}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <AddAlarm navigation={navigation} closeModal={() => setModalVisible(false)} saveAlarm={saveAlarm} />
            </Modal>
        </ScrollView>
    );
}