import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import styles from '../styles/styles';

export default function AddAlarm({ navigation, closeModal }: any) {

    return (
        <ScrollView style={[styles.container, { backgroundColor: '#4A628A',borderTopLeftRadius: 50, borderTopRightRadius: 50 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                <TouchableOpacity style={{ backgroundColor: "transparent" }} onPress={closeModal}>
                    <Text style={{ fontSize: 36, color: "#fff", fontWeight: 500, textAlign: "left" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "transparent" }} onPress={closeModal}>
                    <Text style={{ fontSize: 36, color: "#fff", fontWeight: 500, textAlign: "right" }}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}