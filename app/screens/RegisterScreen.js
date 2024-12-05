import React, { useState, useContext } from 'react';
import { StyleSheet, Image, TouchableWithoutFeedback, View, ScrollView, Text } from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import { AppFormField, SubmitButton, AppForm, ErrorMessage } from '../components/forms';
import color from '../config/color';
import routes from '../navigations/routes';
import authapi from '../apis/AuthApi';
import { showToast } from '../components/ToastMessage';
import authStore from '../auth/authStore';
import AuthContext from '../auth/context';
import validation from '../validation/registerValidation';

const RegisterScreen = ({ navigation }) => {
    const [otpSent, setOtpSent] = useState(false);
    const [loginFailed, setLoginFailed] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const authContext = useContext(AuthContext);

    // Handle sending OTP
    const handleSendOtp = async ({ email }) => {
        try {
            const response = await authapi.sendotp(email);
            console.log(response.data);
            if (response.status === 200) {
                setOtpSent(true);
                showToast('success', 'OTP sent to your email.');
            } else {
                throw new Error(response.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.log(error);
            setLoginFailed(true);
            setErrMsg(error.message || 'Failed to send OTP');
            showToast('error', error.message);
        }
    };


    const handleRegister = async (registerData) => {
        try {
            const result = await authapi.register(registerData);
            if (!result) throw new Error(result.problem);
            const token = result.data.token;
            await authStore.storeToken(token);
            authContext.setToken(token);
            showToast("success", `${result.data.message}`);
        } catch (error) {
            const errorData = error.response?.data?.errors;
            const firstKey = errorData ? Object.keys(errorData)[0] : null;
            const firstErrorMessage = firstKey ? errorData[firstKey][0] : 'An unexpected error occurred';
            console.log(firstErrorMessage);
            setLoginFailed(true);
            setErrMsg(firstErrorMessage || 'An unexpected error occurred');
            showToast("error", `${error.response?.data?.message}`);
            authStore.removeToken();
        }
    };

    return (
        <Screen style={styles.container}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <AppText style={styles.title}>Create An Account</AppText>
            <View style={styles.register}>
                <Text style={styles.subtitle}>I already have an account. </Text>
                <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.LOGIN)}>
                    <AppText style={[styles.subtitle, styles.subtitlePart]}>Sign in</AppText>
                </TouchableWithoutFeedback>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.ScrollView}>
                {!otpSent ? (
                    <AppForm
                        initialValues={{ email: '' }}
                        onSubmit={handleSendOtp}
                        validationSchema={validation.pick(['email'])}
                    >
                        {loginFailed && <ErrorMessage visible={true} error={errMsg} />}
                        <AppFormField
                            autoCorrect={false}
                            name="email"
                            title="Email"
                            placeholder="Enter your email"
                            keyboardType="email-address"
                        />
                        <SubmitButton title="Send OTP" />
                    </AppForm>
                ) : (
                    <AppForm
                        initialValues={{
                            firstName: '',
                            lastName: "",
                            email: '',
                            mobile: '',
                            company: '',
                            AccountType: 'Drivers',
                            lic_no: '',
                            password: '',
                            confirmPassword: '',
                            address: '',
                            dob: '',
                            address: '',
                            phone_code: "",
                        }}
                        onSubmit={(values) => handleRegister(values)}
                        validationSchema={validation}
                    >
                        {loginFailed && <ErrorMessage visible={true} error={errMsg} />}
                        <AppFormField
                            autoCorrect={false}
                            name="firstName"
                            title="First Name"
                            placeholder="Enter First Name" />

                        <AppFormField
                            autoCorrect={false}
                            name="lastName"
                            title="Last Name"
                            placeholder="Enter Last Name" />

                        <PhoneCodeAndMobile
                            phoneCodeItems={phoneCodeTags}
                        />

                        <AppFormField
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            name="email"
                            title={"Email"}
                            placeholder="Enter Email" />

                        <AppFormField
                            name="company"
                            title="Company"
                            placeholder="Enter Company" />

                        <AppFormField
                            title="Gender"
                            name="gender"
                            type="dropdown"
                            items={[
                                { label: 'Male', value: 'Male' },
                                { label: 'Female', value: 'Female' },
                                { label: 'Others', value: 'Others' },
                            ]}
                            placeholder="Select Gender" />
                        <AppFormField
                            title="Driving License No"
                            name="lic_no"
                            placeholder="Enter Driving License No." />
                        <AppFormField
                            title="Password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            rightIcon={passwordVisible ? 'eye-off' : 'eye'}
                            name="password"
                            placeholder="Password"
                            secureTextEntry={!passwordVisible}
                            textContentType="password"
                            onRightIconPress={() => setPasswordVisible(!passwordVisible)} />
                        <AppFormField
                            title='Confirm Password'
                            autoCapitalize="none"
                            autoCorrect={false}
                            rightIcon={passwordVisible ? 'eye-off' : 'eye'}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            secureTextEntry={!passwordVisible}
                            textContentType="password"
                            onRightIconPress={() => setPasswordVisible(!passwordVisible)} />
                        <AppFormField
                            title="Address"
                            name="address"
                            placeholder="Enter Address"
                            multiline
                            numberOfLines={4} />
                        <AppFormField
                            title='Date of Birth'
                            name="dob"
                            type="date"
                            placeholder="Choose Date" />

                        <SubmitButton title="Register" />
                    </AppForm>
                )}
            </ScrollView>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
    },
    logo: {
        width: 160,
        height: 80,
        resizeMode: 'contain',
        marginVertical: 0,
    },
    title: {
        fontSize: 25,
        marginBottom: 10,
    },
    subtitle: {
        color: color.medium,
        marginBottom: 15,
        fontSize: 12,
    },
    subtitlePart: {
        textDecorationLine: 'underline',
    },
    ScrollView: {
        margin: 2,
    },
    register: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 15,
        color: color.medium,
    },
});

export default RegisterScreen;
