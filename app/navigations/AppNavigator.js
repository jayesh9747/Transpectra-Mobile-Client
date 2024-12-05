import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native';

import HomeNavigator from './HomeNavigator';
import DeliveryHistoryScreen from '../screens/HistoryScreen';
import AccountNavigator from './AccountNavigator';
import VerificationNavigator from './verificationNavigator'

const Tab = createBottomTabNavigator();

const DrawerButton = ({ navigation }) => (
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MaterialCommunityIcons style={{ paddingLeft: 20, marginTop: 2 }} name="menu" size={24} />
    </TouchableOpacity>
);

function AppNavigator({ navigation }) {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="HomeScreen"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="home" size={size} color={color} />,
                    title: 'Home',
                    headerLeft: () => <DrawerButton navigation={navigation} />,
                    headerShown: true,
                }}
            />
            <Tab.Screen
                name="History"
                component={DeliveryHistoryScreen}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="history" size={size} color={color} />,
                    title: 'History',
                    headerLeft: () => <DrawerButton navigation={navigation} />,
                    headerShown: true,
                }}
            />

            <Tab.Screen
                name="Verification"
                component={VerificationNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="check-decagram" size={size} color={color} />,
                    title: 'verification',
                    headerLeft: () => <DrawerButton navigation={navigation} />,
                    headerShown: true,
                }}
            />

            <Tab.Screen
                name="Account"
                component={AccountNavigator}
                options={{
                    tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="account" size={size} color={color} />,
                    title: 'Account',
                    headerLeft: () => <DrawerButton navigation={navigation} />,
                    headerShown: false,
                }}
            />

        </Tab.Navigator>
    );
}

export default AppNavigator;
