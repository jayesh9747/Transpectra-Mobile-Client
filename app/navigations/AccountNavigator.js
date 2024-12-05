import React, { useEffect, useState } from 'react';
import { TouchableOpacity, TouchableWithoutFeedback, Text, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AccountScreen from '../screens/AccountScreen';
import AccountInfoScreen from '../screens/AccountInfoScreen';
import color from '../config/color';

import { CommonActions } from '@react-navigation/native';



const Stack = createNativeStackNavigator();

const AccountNavigator = ({ navigation }) => {
    const [isEditing, setIsEditing] = useState(true);


    return (
        <Stack.Navigator
            screenOptions={{ headerShown: true }}

        >
            <Stack.Screen name='AccountScreen' component={AccountScreen} options={{ title: "Account" }} />
            <Stack.Screen
                name="AccountInfo"
                component={AccountInfoScreen}
                initialParams={{ isEditing }} 
                options={{
                    title: "Account Information",
                    headerRight: () => (
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setIsEditing(!isEditing);
                                console.log("this is param set", !isEditing)
                                navigation.dispatch(CommonActions.setParams({ isEditing: isEditing }));
                            }}
                        >
                            <View style={styles.button}>
                                <Text style={styles.buttonText}>
                                    {isEditing ? "Cancel" : "Edit"}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ),
                    headerShown:false
                }}
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    button: {
        marginRight: 10,
        padding: 5,
        backgroundColor: color.secondary,
        borderRadius: 3,
        marginHorizontal: 5,
        paddingHorizontal: 20,
        alignSelf: "center",
        minWidth: 85,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
});

export default AccountNavigator;