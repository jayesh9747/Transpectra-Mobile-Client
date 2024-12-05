import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import color from '../config/color';

const CustomCheckbox = ({ label, selected, onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.checkboxContainer, selected && styles.selectedCheckbox]}>
                <Text style={[styles.checkboxLabel, selected && styles.selectedCheckboxLabel]}>{label}</Text>
                {/* {selected && (
                    <View style={styles.iconContainer}>
                        <Icon name="check" size={20} color="white" />
                    </View>
                )} */}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: color.primary,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 5,
        margin: 5,
        position: 'relative',
    },
    selectedCheckbox: {
        backgroundColor: color.primary,
        borderColor: color.primary,
    },
    checkboxLabel: {
        color: color.medium,
    },
    selectedCheckboxLabel: {
        color: 'white',
    },
    // iconContainer: {
    //     position: 'absolute',
    //     bottom: -5,
    //     right: -5,
    //     backgroundColor: color.secondary,
    //     borderRadius: 50,
    //     padding: 1,
    // },
});

export default CustomCheckbox;

