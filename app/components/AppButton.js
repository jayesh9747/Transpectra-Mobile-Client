import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import colors from '../config/color';

const AppButton = ({ title, onPress, color = 'secondary', ...other },) => {
    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: colors[color] }, other]} onPress={onPress}>
            <Text style={styles.text} >{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        marginVertical: 10,
    },
    text: {
        color: colors.white,
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }
})

export default AppButton
