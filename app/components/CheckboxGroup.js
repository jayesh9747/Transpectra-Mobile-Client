import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomCheckbox from './CustomCheckbox';

const CheckboxGroup = ({ options, selectedOptions, onChange, multiselect = false }) => {
    const handleSelect = (option) => {

        if (multiselect) {
            onChange(option);
        } else {
            onChange([option]);
        }
    };

    return (
        <View style={styles.checkboxGroup}>
            {options.map((option, index) => (
                <CustomCheckbox
                    key={index}
                    label={option}
                    selected={selectedOptions.includes(option)}
                    onPress={() => handleSelect(option)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});

export default CheckboxGroup;
