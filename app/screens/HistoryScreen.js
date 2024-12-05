import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DeliveryApi from '../apis/delivery';
import DeliveryItem from '../components/DeliveryItem';
import routes from '../navigations/routes';


const PastDeliveriesScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [deliveries, setDeliveries] = useState([]); // Initialize as an empty array

    // Fetch past deliveries using the pastDelivery API function
    const fetchPastDeliveries = async () => {
        setRefreshing(true);
        try {
            const response = await DeliveryApi.pastDelivery();

            if (response?.data) {
                setDeliveries(response.data.data);
            } else {
                setDeliveries([]);
            }
        } catch (error) {
            console.error('Error fetching past deliveries:', error);
            Alert.alert('Error', 'Failed to fetch past deliveries. Please try again.');
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    };

    // Navigate to the delivery details page
    const handleViewDelivery = (delivery) => {
        navigation.navigate(routes.DeliveryDetails, { delivery });
    };

    useEffect(() => {
        fetchPastDeliveries();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : deliveries && deliveries.length === 0 ? ( // Safe check for deliveries
                <Text style={styles.emptyText}>No past deliveries found.</Text>
            ) : (
                <FlatList
                    data={deliveries}
                    keyExtractor={(item, index) => item._id || index.toString()} // Fallback key extractor
                    refreshing={refreshing}
                    onRefresh={fetchPastDeliveries}
                    renderItem={({ item }) => (
                        <DeliveryItem
                            item={item}
                            navigation={navigation}
                            handleFirstButtonPress={() => handleViewDelivery(item)}
                            firstButtonText="View Details"
                        />
                    )}
                    contentContainerStyle={styles.listContent}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#777',
    },
    listContent: {
        flexGrow: 1,
    },
});

export default PastDeliveriesScreen;
