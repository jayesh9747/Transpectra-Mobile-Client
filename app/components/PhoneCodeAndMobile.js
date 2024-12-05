import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AppTextInput from './AppTextInput';
import AppDropdownField from './forms/AppDropdownField';
import { useFormikContext } from 'formik';


const PhoneCodeAndMobile = ({ phoneCodeItems, phoneCodeValue, mobileValue, isEditing }) => {
    const { setFieldValue, values } = useFormikContext();
    return (
        <>
            <Text>Mobile No</Text>
            <View style={styles.container}>
                <AppDropdownField
                    name="phone_code"
                    items={phoneCodeItems}
                    placeholder="Code"
                    disabled={isEditing}
                    value={values.phone_code || phoneCodeValue}
                    style={styles.dropdown}
                    onset={(value) => setFieldValue("phone_code", value)}
                />
                <AppTextInput
                    name="mobile"
                    placeholder="Enter Mobile"
                    keyboardType="phone-pad"
                    width="55%"
                    autoCorrect={false}
                    disabled={isEditing}
                    value={values.mobile || mobileValue}
                    style={styles.textInput}
                    onChangeText={(value) => setFieldValue("mobile", value)}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: -5,
    },
    dropdown: {
        flex: 1,
        marginRight: 10,
    },
    textInput: {
        flex: 2,
    },
});

export default PhoneCodeAndMobile;
