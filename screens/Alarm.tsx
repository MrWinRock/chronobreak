import React, { useEffect, useState, useCallback } from 'react';
import { useNavigation, NavigationProp, useIsFocused } from '@react-navigation/native';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Modal } from 'react-native';
import styles from '../styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { getAllCitiesTime } from '../utils/TimeUtils';
import { defaultCity } from '../data/cities';
import AddAlarm from './AddAlarm';

type RootStackParamList = {
    AddAlarm: { fromScreen: string };
};

export default function Alarm() {
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [deletingCity, setDeletingCity] = useState<string | null>(null);
    const [showDeleteButtons, setShowDeleteButtons] = useState(false);
    const [cityTimes, setCityTimes] = useState<Record<string, string | null>>({});
    const [cities, setCities] = useState(defaultCity);
    const isFocused = useIsFocused();
    const [modalVisible, setModalVisible] = useState(false);

    const toggleDeleteButtons = () => {
        setShowDeleteButtons(!showDeleteButtons);
        setDeletingCity(null);
    };

    const loadCityTimes = useCallback(() => {
        const times = getAllCitiesTime(cities);
        setCityTimes(times);
    }, [cities]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadCityTimes();
        setRefreshing(false);
    }, [loadCityTimes]);

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <AddAlarm navigation={navigation} closeModal={() => setModalVisible(false)} />
            </Modal>
        </ScrollView>
    );
}