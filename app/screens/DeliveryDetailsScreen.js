import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import AppTable from '../components/AppTable';

const DeliveryDetailsScreen = ({ route }) => {
  const { delivery } = route.params;

  // Extract delivery details
  const deliveryDetails = {
    'Pickup Location': delivery.pickupLocation.address,
    'Pickup Contact': `${delivery.pickupLocation.contactPerson} (${delivery.pickupLocation.contactNumber})`,
    'Dropoff Location': delivery.dropoffLocation.address,
    'Dropoff Contact': `${delivery.dropoffLocation.contactPerson} (${delivery.dropoffLocation.contactNumber})`,
    'Package Weight': delivery.packageDetails.weight,
    'Package Description': delivery.packageDetails.description,
    'Estimated Delivery Time': new Date(delivery.estimatedDeliveryTime).toLocaleString(),
    'Overall Trip Cost': `$${delivery.overallTripCost}`,
    Status: delivery.status,
    'Invoice Link': delivery.invoicePdf,
  };

  // Format products for table
  const products = delivery.products.map((product) => ({
    Name: product.productName,
    Quantity: product.quantity,
    Specifications: product.specifications,
    'Unit Cost': `$${product.unitCost}`,
  }));

  // Format routes for table
  const routes = delivery.deliveryRoutes.map((route) => ({
    Step: route.step,
    From: route.from,
    To: route.to,
    By: route.by,
    Distance: `${route.distance} km`,
    'Expected Time': route.expectedTime,
    Cost: `$${route.cost}`,
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Delivery Details</Text>
      
      {/* Delivery Overview */}
      <View style={styles.section}>
        {Object.entries(deliveryDetails).map(([key, value]) => (
          <View style={styles.row} key={key}>
            <Text style={styles.label}>{key}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>

      
      <AppTable title="Products in Delivery" data={products} />

  
      <AppTable title="Delivery Routes" data={routes} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    width: '40%',
  },
  value: {
    color: '#555',
    width: '60%',
    textAlign: 'right',
  },
});

export default DeliveryDetailsScreen;
