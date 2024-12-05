import React, { useContext, useState } from 'react'
import { StyleSheet, Image, TouchableWithoutFeedback, View, Text } from 'react-native'
import * as Yup from 'yup';

import { AppFormField, SubmitButton, AppForm, ErrorMessage } from '../components/forms';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import color from '../config/color';
import routes from '../navigations/routes';
import authapi from '../apis/AuthApi';
import authStore from '../auth/authStore';
import AuthContext from '../auth/context';
import { showToast } from '../components/ToastMessage';
import useProfileStore from '../hooks/useUserStore';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required()
        .label('Email'),
    password: Yup.string().required().min(6).label('Password')
})

const LoginScreen = ({ navigation }) => {

    const [loginFailed, setLoginFailed] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const authContext = useContext(AuthContext);

    const handleSubmit = async ({ email, password }) => {
        try {
            const result = await authapi.login({ email, password });
            if (!result || result.status !== 200) throw new Error(result.problem || 'Login failed');
            setLoginFailed(false);
            await useProfileStore.getState().setUserProfile(result.data);
            const token = result?.data?.token;
            await authStore.storeToken(token);
            authContext.setToken(token);
            showToast("success", `${result.data.message}`);
        } catch (error) {
            console.log(error);
            setLoginFailed(true);
            setErrMsg(error.response?.data?.message || 'An unexpected error occurred');
            useProfileStore.getState().clearUserProfile();
            await authStore.storeAuthData(token);
            await authStore.removeToken();
        }
    };

    return (
        <Screen style={styles.container}>
            <Image
                style={styles.logo}
                source={require('../assets/logo.png')} />
            <AppText style={styles.title}>Welcome back</AppText>

            <View style={styles.register}>
                <Text style={styles.subtitle}>Don't have an account?</Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.REGISTER)}>
                    <Text style={styles.registerTagline}>Create account</Text>
                </TouchableWithoutFeedback>
            </View>

            <AppForm
                initialValues={{ mobile: '', password: '' }}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={validationSchema}
            >

                {loginFailed && <ErrorMessage visible={true} error={errMsg} />}

                <AppFormField
                    title="Email"
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType='email'
                    name='email'
                    icon='mail'
                    placeholder='Enter Email'
                />
                <AppFormField
                    title='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    icon={'lock'}
                    rightIcon={passwordVisible ? 'eye-off' : 'eye'}
                    name='password'
                    placeholder='Password'
                    secureTextEntry={!passwordVisible}
                    textContentType='password'
                    onRightIconPress={() => setPasswordVisible(!passwordVisible)}
                />

                {/* <AppText style={styles.forgetPassword}>Forget Password?</AppText> */}
                <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.FORGET_PASSWORD)}>
                    <Text style={styles.forgetPassword}>Forget Password?</Text>
                </TouchableWithoutFeedback>
                <SubmitButton title='Login' color={color.primary} />
            </AppForm>
            <AppText style={styles.footerline}>All Rights are reserved Made by Konnections</AppText>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    logo: {
        width: 160,
        height: 80,
        resizeMode: 'contain',
    },
    registerTagline: {
        textDecorationLine: 'underline',
    },
    forgetPassword: {
        textAlign: 'right',
        color: color.medium,
        fontSize: 15,
        fontWeight: "600",
        marginVertical: 10
    },
    footerline: {
        fontSize: 12,
        color: color.medium
    },
    title: {
        fontSize: 25,
        marginBottom: 20
    },
    register: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 20
    },
    subtitle: {
        marginRight: 5,
    },
    registerTagline: {
        color: color.medium,
        textDecorationLine: 'underline',
    },
})

export default LoginScreen;