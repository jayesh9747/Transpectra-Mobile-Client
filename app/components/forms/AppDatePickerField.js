import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppTextInput from '../AppTextInput';


const DatePickerField = ({ name, value, setFieldValue, onBlur, ...otherProps }) => {
    const [date, setDate] = useState(value || new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setFieldValue(name, currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const formatDate = (date) => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        if (day < 10) {
            day = `0${day}`;
        }

        if (month < 10) {
            month = `0${month}`;
        }

        return `${day}/${month}/${year}`;
    };

    return (
        <View >
            {/* <TouchableOpacity onPress={showDatepicker} AppTextInput> */}
            <AppTextInput
                value={value ? formatDate(new Date(value)) : 'Choose Date'}
                editable={false}
                onBlur={onBlur}
                rightIcon="calendar"
                onRightIconPress={showDatepicker}
                {...otherProps}
            />
            {/* </TouchableOpacity> */}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};



export default DatePickerField;
