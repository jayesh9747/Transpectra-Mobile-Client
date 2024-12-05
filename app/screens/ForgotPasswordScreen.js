import React, { useContext, useState } from 'react'
import { StyleSheet, Image, TouchableWithoutFeedback, View, Text } from 'react-native'
import * as Yup from 'yup';

import { AppFormField, SubmitButton, AppForm, ErrorMessage } from '../components/forms';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import color from '../config/color';
import authapi from '../apis/AuthApi';
import authStore from '../auth/authStore';
import AuthContext from '../auth/context';
import { showToast } from '../components/ToastMessage';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Enter a valid email').required('Email is required').label('Email'),
})

const ForgotPasswordScreen = ({ navigation }) => {

    const [loginFailed, setLoginFailed] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    const authContext = useContext(AuthContext);

    const handleSubmit = async ({ email }) => {
        try {
            const result = await authapi.forgotPassword(email);

            console.log(result.data);

            if (!result || result.status !== 200) throw new Error(result.problem || 'Login failed');


            setLoginFailed(false);
            const token = result.data.token
            console.log("this is from the login screen", token);

            await authStore.storeToken(token);
            const tok = await authStore.getToken();
            console.log("this is from login screen store token ", tok);
            console.log('Successfully stored token');
            authContext.setToken(token);
            showToast("success", `${result.data.message}`);
        } catch (error) {
            console.log(error);
            setLoginFailed(true);
            setErrMsg(error.response?.data?.message || 'An unexpected error occurred');
            authStore.removeToken();
        }
    };


    return (
        <Screen style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require('../assets/logo.png')}
                />
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>

                    <Text style={styles.backButton}>
                        Back to Login
                    </Text>

                </TouchableWithoutFeedback>
            </View>

            <AppText style={styles.title}>Forgot Password?</AppText>

            <View style={styles.register}>
                <Text style={styles.subtitle}>
                    Enter the email address you used when you joined and we'll send you instructions to reset your password
                </Text>
            </View>

            <AppForm
                initialValues={{ email: '' }}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={validationSchema}
            >
                {loginFailed && <ErrorMessage visible={true} error={errMsg} />}

                <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    name="email"
                    title={"Email"}
                    icon={"email"}
                    placeholder="Enter Email"
                />

                <SubmitButton title='Reset Password' color={color.primary} />
            </AppForm>

            <AppText style={styles.footerline}>All Rights are reserved Made by Konnections</AppText>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    logo: {
        width: 160,
        height: 80,
        resizeMode: 'contain',
    },
    backButton: {
        fontSize: 16,
        color: color.dark,
    },
    title: {
        fontSize: 25,
        marginBottom: 20,
        marginTop: 40,
    },
    register: {
        paddingBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: color.medium,
    },
    footerline: {
        fontSize: 12,
        color: color.medium,
    },
});

export default ForgotPasswordScreen;