
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import color from '../config/color';
import useCartStore from '../hooks/useCartStore';
import useWishListStore from '../hooks/useWishListStore';

const { width } = Dimensions.get('window');
const cardWidth = (width - 30) / 2;

const ProductCard = ({ product, navigation }) => {
    const { id, code, images, discount = "Make to Order" } = product;

    const productImageUri = images[0].image_url;

    const addProductToCart = useCartStore(state => state.addProduct);
    const removeProductFromCart = useCartStore(state => state.removeProduct);
    const cartProducts = useCartStore(state => state.products);

    const addProductToWishList = useWishListStore(state => state.addProduct);
    const removeProductFromWishList = useWishListStore(state => state.removeProduct);
    const wishListProducts = useWishListStore(state => state.products);

    const [isInCart, setInCart] = useState(false);
    const [isInWishList, setInWishList] = useState(false);

    useEffect(() => {
        const productInCart = cartProducts.some(cartProduct => cartProduct.id === id);
        setInCart(productInCart);
        const productInWishList = wishListProducts.some(wishListProduct => wishListProduct.id === id);
        setInWishList(productInWishList);
    }, [cartProducts, wishListProducts, id]);

    const handleCartAction = () => {
        if (isInCart) {
            removeProductFromCart(id);
        } else {
            addProductToCart(product);
        }
        setInCart(!isInCart);
    };

    const handleWishListAction = () => {
        if (isInWishList) {
            removeProductFromWishList(id);
        } else {
            addProductToWishList(product);
        }
        setInWishList(!isInWishList);
    };

    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('ProductDetail', { productId: id })}>
            <View style={[styles.card, { width: cardWidth }]}>
                <View style={styles.discountTag}>
                    <Text style={styles.discountText}>{discount}</Text>
                </View>
                <Image source={{ uri: productImageUri }} style={styles.productImage} />
                <Text style={styles.productName}>{code}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'column',
        position: 'absolute',
        top: 15,
        right: 10
    },
    icon: {
        marginRight: -2,
        marginBottom: 10,
        width: 35,
        height: 35,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    iconInCart: {
        backgroundColor: 'green',
    },
    iconInWishList: {
        backgroundColor: 'red',
    },
    card: {
        padding: 10,
        margin: 5,
        backgroundColor: '#fff',
        height: 200,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative'
    },
    discountTag: {
        position: 'absolute',
        top: 15,
        left: 0,
        backgroundColor: '#A96C35',
        padding: 5,
        borderTopEndRadius: 100,
        borderBottomEndRadius: 100,
        zIndex: 1
    },
    discountText: {
        color: '#fff',
        fontSize: 15,
        paddingRight: 5
    },
    productImage: {
        width: '100%',
        height: 140,
        resizeMode: 'contain',
        marginTop: 20
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.medium,
        textAlign: "center",
        paddingBottom: 10
    },
});

export default ProductCard;
