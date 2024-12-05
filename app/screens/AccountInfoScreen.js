import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, ScrollView, Text } from 'react-native';
import Screen from '../components/Screen';
import { AppFormField, SubmitButton, AppForm } from '../components/forms';
import color from '../config/color';
import dropdownApi from '../apis/dropdown';
import validation from '../validation/registerValidation';
import authapi from '../apis/AuthApi';
import { showToast } from '../components/ToastMessage';
import PhoneCodeAndMobile from '../components/PhoneCodeAndMobile';


const AccountInfoScreen = ({ route }) => {
    let data = route?.params?.data;
    const [countryTags, setCountryTags] = useState([]);
    const [phoneCodeTags, setPhoneCodeTags] = useState([]);
    const [stateTags, setStateTags] = useState([]);
    const [cityTags, setCityTags] = useState([]);
    const [country_id, setCountry_id] = useState(data.country_id);
    const [state_id, setState_id] = useState(data.state_id);
    const [isEditing, setIsEditing] = useState(true);

    const fetchCountries = async () => {
        try {
            const result = await dropdownApi.getCountries();
            const countries = result.data.data.map((country) => ({
                label: country?.name,
                value: country?.id
            }));
            const phoneCodes = result.data.data.map((phoneCode) => ({
                label: phoneCode?.iso2,
                value: phoneCode?.phone_code
            }))
            setCountryTags(countries);
            setPhoneCodeTags(phoneCodes);

        } catch (error) {
            console.log("Error occurred while fetching countries", error.response?.data);
        }
    };

    const fetchStates = async () => {
        try {
            const result = await dropdownApi.getStates(country_id);
            const states = result.data.data.map((state) => ({
                label: state?.name,
                value: state?.id
            }));
            setStateTags(states);
        } catch (error) {
            showToast('error', error?.response?.data.errors?.country_id);
            console.log("Error occurred while fetching states", error?.response?.data.errors?.country_id);
        }
    };

    const fetchCities = async () => {
        try {
            const result = await dropdownApi.getCity(state_id);
            const cities = result.data.data.map((city) => ({
                label: city?.name,
                value: city?.id
            }));
            setCityTags(cities);
        } catch (error) {

            console.log("Error occurred while fetching cities", error?.response?.data);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            const result = await authapi.updateCustomer(formData);
            showToast("success", result.data?.message);
            if (!result) throw new Error(result.problem);
            setIsEditing(!isEditing);
        } catch (error) {
            showToast("error", error.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    useEffect(() => {
        if (country_id) {
            fetchStates();
        }
    }, [country_id]);

    useEffect(() => {
        if (state_id) {
            fetchCities();
        }
    }, [state_id]);

    data = {
        name: "Shrikant Salve",
        email: "shrikantsalve123@gmail.com",
        mobile: "8102096351",
        company: "xyz",
        phone_code: "IN",
        lic_no: "XYZ11223456",
        address: "ramkrishna",
        dob: '24-08-1980'
    }


    return (
        <Screen style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.title}>Account Information</Text>

                <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.button}>
                    <Text style={styles.buttonText}>{isEditing ? "Edit" : "Cancel"}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <AppForm
                    initialValues={{
                        name: data.name,
                        email: data.email,
                        mobile: data.mobile,
                        company: data.company,
                        phone_code: data.phone_code,
                        customer_type: data.customer_type,
                        lic_no: data.lic_no,
                        address: data.address,
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={validation.RegisterValidationSchema}
                >
                    <AppFormField
                        autoCorrect={false}
                        name="name"
                        title="Name"
                        placeholder="Enter Name"
                        editable={isEditing}
                    />

                    <PhoneCodeAndMobile
                        phoneCodeItems={phoneCodeTags}
                        isEditing={isEditing}
                    />

                    <AppFormField
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        name="email"
                        title="Email"
                        placeholder="Enter Email"
                        editable={isEditing}
                    />
                    <AppFormField
                        name="company"
                        title="Company"
                        placeholder="Enter Company"
                        editable={isEditing}
                    />
                    <AppFormField
                        title="License No"
                        name="lic_no"
                        placeholder="Enter License No."
                        editable={isEditing}
                    />
                    <AppFormField
                        title="Address"
                        name="address"
                        placeholder="Enter Address"
                        multiline
                        numberOfLines={4}
                        editable={isEditing}
                    />

                    {!isEditing && <SubmitButton title="Update" color={color.blue} />}
                </AppForm>
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 6,
        marginTop: 5,
    },
    footerline: {
        fontSize: 12,
        color: color.medium,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    scrollView: {
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    phoneCode: {
        width: 80
    },
    button: {
        flex: 1,
        padding: 5,
        backgroundColor: color.blue,
        borderRadius: 3,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default AccountInfoScreen;

