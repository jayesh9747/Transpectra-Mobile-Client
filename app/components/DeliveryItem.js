import React from 'react';
import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import color from '../config/color';

const DeliveryItem = ({
  item,
  navigation,
  handleFirstButtonPress,
  handleSecondButtonPress,
  firstButtonText,
  secondButtonText
}) => {
  // Format the date into a readable format
  const formattedDate = item.estimatedDeliveryTime
    ? new Date(item.estimatedDeliveryTime).toLocaleDateString()
    : 'N/A';

  // Check if there's only one button or two
  const buttonCount = (firstButtonText ? 1 : 0) + (secondButtonText ? 1 : 0);

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('DeliveryDetail', { deliveryId: item._id })}>
      <View style={styles.deliveryContainer}>
        <Image source={require('../assets/truck.jpeg')} style={styles.deliveryImage} />

        <View style={styles.deliveryDetails}>
          <Text style={styles.deliveryTitle}>
            {`${item.pickupLocation.address} ➔ ${item.dropoffLocation.address}`}
          </Text>
          <Text style={styles.deliveryCategory}>Status: {item.status}</Text>
          <Text style={styles.deliveryDate}>Estimated Date: {formattedDate}</Text>
          <View style={styles.buttonContainer}>
            {firstButtonText && (
              <TouchableOpacity
                onPress={() => handleFirstButtonPress(item._id)}
                style={[
                  styles.button,
                  buttonCount === 1 && styles.fullWidthButton, // Full width for single button
                ]}
              >
                <Text style={styles.buttonText}>{firstButtonText}</Text>
              </TouchableOpacity>
            )}
            {secondButtonText && (
              <TouchableOpacity
                onPress={() => handleSecondButtonPress(item._id)}
                style={[
                  styles.button,
                  buttonCount === 1 && styles.fullWidthButton, // Full width for single button
                ]}
              >
                <Text style={styles.buttonText}>{secondButtonText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 5,
  },
  deliveryContainer: {
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
  },
  deliveryImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 8,
  },
  deliveryDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deliveryCategory: {
    fontSize: 14,
    color: '#777',
  },
  deliveryDate: {
    fontSize: 14,
    color: '#777',
  },
  button: {
    flex: 1,
    padding: 5,
    backgroundColor: color.blue,
    borderRadius: 3,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  fullWidthButton: {
    marginHorizontal: 0, // Remove side margins for single button
  },
});

export default DeliveryItem;
