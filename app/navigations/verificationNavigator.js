import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VerificationScreen from '../screens/verificationScreen';
import VerifyWithVahanScreen from '../screens/VerifyWithVahanScreen';
import VerifyWithSarthiScreen from '../screens/VerifyWithSarthiScreen';

const Stack = createNativeStackNavigator();

function VerificationNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="VerificationScreen" component={VerificationScreen} />
            <Stack.Screen name="VerifyVahan" component={VerifyWithVahanScreen} />
            <Stack.Screen name="VerifySarthi" component={VerifyWithSarthiScreen} />
        </Stack.Navigator>
    );
}

export default VerificationNavigator;
