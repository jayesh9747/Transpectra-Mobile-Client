import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Screen from './Screen';

const NoItem = ({ message }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        color: '#555',
        alignSelf: 'center',
    },
});

export default NoItem;
