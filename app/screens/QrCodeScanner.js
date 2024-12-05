import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import routes from '../navigations/routes';
import DeliveryApi from '../apis/delivery'; // Import the DeliveryApi module
import AppButton from '../components/AppButton';

const QRCodeScanner = ({ navigation, route }) => {
    // const { deliveryId } = route.params || "67503358471007d9f0829883"; // Retrieve deliveryId passed from navigation
    const deliveryId = "67503358471007d9f0829883"; // Retrieve deliveryId passed from navigation
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [isScannerActive, setIsScannerActive] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        setIsScannerActive(false);

        // Parse QR code data (example assumes it's a JSON string)
        try {
            const parsedData = JSON.parse(data);
            const { uniqueOrderId, warehouseId } = parsedData;

            setLoading(true);
            const response = await DeliveryApi.CompleteDelivery({
                uniqueOrderId,
                deliveryId,
                warehouseId,
            });


            setLoading(false);

            if (response.data.success) {
                Alert.alert(
                    'Success',
                    'Delivery completed successfully!',
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate(routes.HOME),
                        },
                    ]
                );
            } else {
                Alert.alert('Error', 'Failed to complete the delivery. Please try again.');
            }
        } catch (error) {
            setLoading(false);
            Alert.alert('Error', 'Invalid QR code data or delivery failed.');
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission...</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {isScannerActive && (
                <>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setIsScannerActive(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>

                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                </>
            )}

            {!isScannerActive && (
                <View style={styles.optionsContainer}>
                    <Text style={styles.readyText}>Ready to scan again?</Text>
                    <AppButton
                        title={"Resume Scanning"}
                        onPress={() => {
                            setScanned(false);
                            setIsScannerActive(true);
                        }}
                    />
                    <AppButton
                        title={"Back to Home"}
                        onPress={() => navigation.navigate(routes.HOME)}
                        color="red"
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    optionsContainer: {
        padding: 20,
        width: '100%'
    },
    readyText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default QRCodeScanner;
