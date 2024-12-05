
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import color from '../config/color';
import AppSlider from '../components/AppSlider';
import AppTable from '../components/AppTable'; // Import reusable table component
import AppButton from '../components/AppButton';
import DeliveryApi from '../apis/delivery'; // Assuming this API handles the requests

const CurrentDeliveryScreen = ({ navigation }) => {
    const [deliveryData, setDeliveryData] = useState(null); // State to store delivery data
    const [loading, setLoading] = useState(true);

    // Fetch ongoing delivery data
    const fetchOngoingDelivery = async () => {
        try {
            const response = await DeliveryApi.OngoingDelivery();
            if (response?.data?.success) {
                setDeliveryData(response.data.data[0]); // Assuming only one delivery is returned
            } else {
                throw new Error('No ongoing delivery found');
            }
        } catch (error) {
            console.error('Error fetching ongoing delivery:', error);
            Alert.alert('Error', 'Failed to fetch delivery data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOngoingDelivery();
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!deliveryData) {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>No On going delivery data available.</Text>
            </View>
        );
    }

    // Destructure delivery data
    const { pickupLocation, dropoffLocation, deliveryRoutes, products, uniqueOrderId, _id } = deliveryData;

    // Prepare data for pickup/dropoff table
    const pickupDropoffData = [
        {
            location: 'Pickup',
            address: pickupLocation.address,
            contact: `${pickupLocation.contactPerson}, ${pickupLocation.contactNumber}`,
        },
        {
            location: 'Dropoff',
            address: dropoffLocation.address,
            contact: `${dropoffLocation.contactPerson}, ${dropoffLocation.contactNumber}`,
        },
    ];

    // Prepare product data
    const productData = products.map((product) => ({
        item: product.productName,
        quantity: product.quantity,
        unitCost: `₹${product.unitCost}`,
    }));

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <>
                    <AppSlider images={[{ image_url: require('../assets/map.png') }]} />

                    <View style={styles.productCodeContainer}>
                        <Text style={styles.productCode}>{`Order ID: ${uniqueOrderId}`}</Text>
                    </View>

                    <View style={styles.ButtonContainer}>
                        <AppButton
                            title="Scan QR Code"
                            style={styles.Button}
                            color="blue"
                            onPress={() => navigation.navigate("QRCode", { deliveryId: _id })}
                        />
                    </View>

                    {/* Pickup and Dropoff Table */}
                    <AppTable title="Pickup and Dropoff Locations" data={pickupDropoffData} />

                    {/* Route Steps Table */}
                    {deliveryRoutes.map((route, index) => (
                        <AppTable
                            key={index}
                            title={`Route Step ${route.step}`}
                            data={[
                                {
                                    from: route.from,
                                    to: route.to,
                                    transport: route.by,
                                    distance: `${route.distance} km`,
                                    time: route.expectedTime,
                                    cost: `₹${route.cost}`,
                                },
                            ]}
                        />
                    ))}

                    {/* Products Table */}
                    <AppTable title="Delivery Items" data={productData} />
                </>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    noDataContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    noDataText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.medium,
    },
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContent: {
        paddingBottom: 60,
    },
    productCodeContainer: {
        margin: 10,
        backgroundColor: color.light,
    },
    ButtonContainer: {
        margin: 10,
    },
    productCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.medium,
        margin: 10,
        textAlign: 'center',
    },
    Button: {
        flex: 1,
        backgroundColor: color.blue,
        padding: 20,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default CurrentDeliveryScreen;
