import React from 'react'
import { StyleSheet, View } from 'react-native'
import colors from '../config/color'

const Separator = () => {
    return (
        <View style={styles.Separator} />
    )
}

const styles = StyleSheet.create({
    Separator: {
        height: 1,
        width: '100%',
        color: colors.light
    }
})

export default Separator
