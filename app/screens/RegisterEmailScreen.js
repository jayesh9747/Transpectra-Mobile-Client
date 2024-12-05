import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Screen from '../components/Screen';
import color from '../config/color';

const RegisterEmailScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleSendOtp = async () => {
        // Simulate sending OTP to the email
        console.log(`Sending OTP to ${email}`);
        // Navigate to OTP Screen
        navigation.navigate('Otp', { email });
    };

    return (
        <Screen style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
                <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { borderWidth: 1, borderColor: color.medium, padding: 10, borderRadius: 8, marginBottom: 20 },
    button: { backgroundColor: color.primary, padding: 15, borderRadius: 8 },
    buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});

export default RegisterEmailScreen;
