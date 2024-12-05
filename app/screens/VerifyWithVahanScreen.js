import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import * as Yup from 'yup';

import { AppFormField, SubmitButton, AppForm, ErrorMessage } from '../components/forms';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import color from '../config/color';
import routes from '../navigations/routes';
import VerificationApi from '../apis/verifiacation';
import { showToast } from '../components/ToastMessage';

const validationSchema = Yup.object().shape({
    truckNumber: Yup.string().required().label('Vehicle Number'),
    ownerName: Yup.string().required().label('Owner Name'),
    chassisNumber: Yup.string().required().label('Chassis Number'),
    engineNumber: Yup.string().required().label('Engine Number'),
});

const VerifyWithVahanScreen = ({ navigation }) => {
    const [submissionFailed, setSubmissionFailed] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = async (values) => {
        try {
            const result = await VerificationApi.verifyVehicle(values);
            console.log(result);
            if (!result || result.status !== 200) throw new Error(result.problem || 'Verification failed');
            setSubmissionFailed(false);
            showToast("success", `Verification successful: ${result.data.message}`);
        } catch (error) {
            console.log(error);
            setSubmissionFailed(true);
            setErrMsg(error.response?.data?.message || 'An unexpected error occurred');
        }
    };

    return (
        <Screen style={styles.container}>
            <AppText style={styles.title}>Verify Vehicle Details</AppText>

            <View style={styles.register}>
                <Text style={styles.subtitle}>Need help?</Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.HELP)}>
                    <Text style={styles.registerTagline}>Contact Support</Text>
                </TouchableWithoutFeedback>
            </View>

            <AppForm
                initialValues={{
                    truckNumber: '',
                    ownerName: '',
                    chassisNumber: '',
                    engineNumber: '',
                }}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={validationSchema}
            >
                {submissionFailed && <ErrorMessage visible={true} error={errMsg} />}

                <AppFormField
                    title="Vehicle Number"
                    autoCapitalize='characters'
                    autoCorrect={false}
                    name='truckNumber'
                    icon='car'
                    placeholder='Enter Vehicle Number'
                />
                <AppFormField
                    title="Owner Name"
                    autoCapitalize='words'
                    autoCorrect={false}
                    name='ownerName'
                    icon='account'
                    placeholder='Enter Owner Name'
                />
                <AppFormField
                    title="Chassis Number"
                    autoCapitalize='none'
                    autoCorrect={false}
                    name='chassisNumber'
                    icon='car'
                    placeholder='Enter Chassis Number'
                />
                <AppFormField
                    title="Engine Number"
                    autoCapitalize='none'
                    autoCorrect={false}
                    name='engineNumber'
                    icon='engine'
                    placeholder='Enter Engine Number'
                />

                <SubmitButton title='Verify' color={color.primary} />
            </AppForm>
            <AppText style={styles.footerline}>All Rights are reserved Made by Konnections</AppText>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 25,
        marginBottom: 20,
    },
    register: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20,
    },
    subtitle: {
        marginRight: 5,
    },
    registerTagline: {
        color: color.medium,
        textDecorationLine: 'underline',
    },
    footerline: {
        fontSize: 12,
        color: color.medium,
    },
});

export default VerifyWithVahanScreen;
