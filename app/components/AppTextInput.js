import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/style';
import color from '../config/color';

const AppTextInput = ({ icon, rightIcon, onRightIconPress, width = '100%', value, disabled, style, ...otherProps }) => {
    return (
        <View style={[styles.container, { width }, style]}>
            {icon && (
                <MaterialCommunityIcons
                    name={icon}
                    size={25}
                    color={defaultStyles.colors.medium}
                    style={styles.icon}
                />
            )}
            {
                disabled &&
                <TextInput
                    placeholderTextColor={color.medium}
                    value={value}
                    editable={!disabled}
                    style={[styles.textInput, defaultStyles.text]}
                    {...otherProps}
                />
            }
            {
                !disabled &&
                <TextInput
                    placeholderTextColor={color.medium}
                    value={value}
                    style={[styles.textInput, defaultStyles.text]}
                    {...otherProps}
                />
            }
            {rightIcon && (
                <TouchableOpacity onPress={onRightIconPress} style={styles.rightIconContainer}>
                    <MaterialCommunityIcons
                        name={rightIcon}
                        size={25}
                        color={defaultStyles.colors.medium}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderColor: color.medium,
        borderWidth: 1,
        flexDirection: 'row',
        padding: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
    },
    rightIconContainer: {
        marginLeft: 10,
    },
});

export default AppTextInput;

