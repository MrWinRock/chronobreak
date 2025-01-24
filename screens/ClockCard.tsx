import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

interface ClockCardProps {
    city: string;
    time: string | null;
    deleting: boolean;
    onConfirmDelete: () => void;
    showDeleteButton: boolean;
}

const ClockCard: React.FC<ClockCardProps> = ({ city, time = "N/A", onConfirmDelete, showDeleteButton }) => {
    return (
        <View style={styles.timeContainer}>
            <Text style={styles.cityName}>{city}</Text>
            {showDeleteButton ?
                (
                    <View style={styles.deletingContainer}>
                        <TouchableOpacity onPress={onConfirmDelete} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )
                : (
                    <Text style={styles.timeDisplay} >{time}</Text>)
            }
        </View >
    );
};

export default ClockCard;
