import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import DeliveryApi from '../apis/delivery';
import DeliveryItem from '../components/DeliveryItem';
import routes from '../navigations/routes';

const AcceptNewDelivery = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [deliveries, setDeliveries] = useState([]); // Initialize as an empty array

    // Fetch assigned deliveries
    const fetchDeliveries = async () => {
        setRefreshing(true);
        try {
            const response = await DeliveryApi.FetchAssignedDelivery();

            if (response?.data) {
                setDeliveries(response.data.data);
            } else {
                setDeliveries([]);
            }
        } catch (error) {
            console.error('Error fetching deliveries:', error);
            Alert.alert('Error', 'Failed to fetch deliveries. Please try again.');
        } finally {
            setRefreshing(false);
            setLoading(false);
        }
    };

    // Navigate to the delivery details page
    const handleViewDelivery = (delivery) => {
        navigation.navigate(routes.DeliveryDetails, { delivery });
    };

    // Start delivery and navigate to CurrentDelivery screen
    const handleStartDelivery = async (deliveryId) => {
        try {
            console.log("this is delivery Id ", deliveryId);
            const response = await DeliveryApi.startDelivery({ deliveryId });

            console.log("start delivery",response?.data.success);

            if (response?.data.success) {
                Alert.alert('Success', 'Delivery started successfully.');
                navigation.navigate(routes.CURRENT_DELIVERY, { deliveryId });
            } else {
                throw new Error('Failed to start delivery');
            }
        } catch (error) {
            console.error('Error starting delivery:', error);
            Alert.alert('Error', 'Failed to start delivery. Please try again.');
        }
    };

    useEffect(() => {
        fetchDeliveries();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : deliveries && deliveries.length === 0 ? ( // Safe check for deliveries
                <Text style={styles.emptyText}>No deliveries assigned yet.</Text>
            ) : (
                <FlatList
                    data={deliveries}
                    keyExtractor={(item, index) => item._id || index.toString()} // Fallback key extractor
                    refreshing={refreshing}
                    onRefresh={fetchDeliveries}
                    renderItem={({ item }) => (
                        <DeliveryItem
                            item={item}
                            navigation={navigation}
                            handleFirstButtonPress={() => handleViewDelivery(item)}
                            handleSecondButtonPress={() => handleStartDelivery(item._id)}
                            secondButtonText="Start Delivery"
                            firstButtonText="View"
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

export default AcceptNewDelivery;
