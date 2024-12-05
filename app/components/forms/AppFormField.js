import React from 'react';
import { StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';
import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';
import AppText from '../AppText';
import DatePickerField from './AppDatePickerField';
import AppDropdownField from './AppDropdownField';

const AppFormField = ({ title, name, width, type, onset, items, editable, ...otherProps }) => {
    const { setFieldTouched, handleChange, errors, touched, setFieldValue, values } = useFormikContext();

    const handleDropdownChange = (value) => {
        setFieldValue(name, value);
        if (onset) {
            onset(value);
        }
        if (value) {
            console.log(`This is ${name} value:`, value);
        }
    };

    const renderField = () => {
        switch (type) {
            case 'date':
                return (
                    <DatePickerField
                        name={name}
                        value={values[name]}
                        setFieldValue={setFieldValue}
                        onBlur={() => setFieldTouched(name)}
                        maximumDate={new Date()}
                        {...otherProps}
                    />
                );
            case 'dropdown':
                return (
                    <AppDropdownField
                        name={name}
                        items={items}
                        placeholder={otherProps.placeholder}
                        width={width}
                        onset={handleDropdownChange}
                        disabled={editable}
                        value={values[name]}
                        {...otherProps}
                    />
                );
            default:
                return (
                    <AppTextInput
                        onBlur={() => setFieldTouched(name)}
                        onChangeText={handleChange(name)}
                        width={width}
                        disabled={editable}
                        value={values[name]}
                        {...otherProps}
                    />
                );
        }
    };

    return (
        <>
            <AppText style={styles.heading}>{title}</AppText>
            {renderField()}
            <ErrorMessage error={errors[name]} visible={touched[name]} />
        </>
    );
};

const styles = StyleSheet.create({
    heading: {
        fontSize: 15,
        marginBottom: -6,
    },
});

export default AppFormField;
