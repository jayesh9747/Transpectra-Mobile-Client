import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, RefreshControl, TouchableWithoutFeedback } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import routes from '../navigations/routes';

const HomeScreen = ({ navigation }) => {


    return (
        <ScrollView
            style={styles.container}
        >
            <View style={styles.header}>
                <Image source={require('../assets/home.png')} style={styles.headerImage} />
            </View>

            <Text style={styles.headerText}>Welcome back </Text>

            <View style={styles.box}>

                <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.CURRENT_DELIVERY)}>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>Ongoing delivery</Text>
                        <FontAwesome5 name="greater-than" size={25} color="gray" />
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={() => navigation.navigate(routes.ACCEPTNEWDELIVERY)}>
                    <View style={styles.card}>
                        <Text style={styles.cardText}>Assigned Deliveries</Text>
                        <FontAwesome5 name="greater-than" size={25} color="gray" />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    categoriesScrollView: {
        paddingTop: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredText: {
        textAlign: 'center',
    },
    header: {
        padding: 10,
        alignItems: 'center',
    },
    headerImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    headerText: {
        fontSize: 25,
        marginTop: 10,
        paddingLeft: 20,
        fontWeight: 'bold',
    },
    box: {
        paddingTop: 10,
        paddingHorizontal: 10,
        marginRight : 10
    },
    card: {
        width: '100%',
        flexDirection: 'row',
        margin: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        height: 120,
        alignContent: 'space-between',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    cardText: {
        fontSize: 20,
        paddingLeft: 20
    }
});

export default HomeScreen;
