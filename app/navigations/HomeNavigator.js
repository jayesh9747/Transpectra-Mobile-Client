
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';

import CurrentDeliveryScreen from '../screens/CurrentDeliveryScreen';
import QRCodeScanner from '../screens/QrCodeScanner';
import AcceptNewDelivery from '../screens/AcceptNewDeliveries';
import DeliveryDetailsScreen from '../screens/DeliveryDetailsScreen';

const Stack = createNativeStackNavigator();

function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CurrentDelivery" component={CurrentDeliveryScreen} />
            <Stack.Screen name="QRCode" component={QRCodeScanner} />
            <Stack.Screen name="AcceptDelivery" component={AcceptNewDelivery} />
            <Stack.Screen name="DeliveryDetails" component={DeliveryDetailsScreen} />
        </Stack.Navigator>
    );
}

export default HomeNavigator;
