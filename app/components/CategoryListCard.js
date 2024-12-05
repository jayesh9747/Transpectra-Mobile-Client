import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import routes from '../navigations/routes';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.45; // Adjust the width as per your requirement (e.g., 45% of screen width)

const CategoryListCard = ({ item, navigation }) => {
    const handlePress = () => {
        if (item.sub_categories && item.sub_categories.length === 0) {
            navigation.navigate(routes.PRODUCT_LIST, { categoryCode: item.category_code, data: item });
        } else {
            navigation.push(routes.CATEGORY_LIST, { subCategories: item.sub_categories });
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={[styles.card, { width: cardWidth }]}>
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <Text style={styles.title}>{item.name}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        margin: 5,
        padding: 8,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 120,
        marginTop: 5,
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CategoryListCard;
