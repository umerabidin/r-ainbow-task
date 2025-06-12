import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { AppText, LoadingIndicator } from '../components/common';
import ProductList from '../components/ProductList';
import { theme } from '../types/themes';
import { useAuth } from '../context/AuthContext';
import BirthdaySection from '../components/BirthdaySection';
import { RFValue } from 'react-native-responsive-fontsize';
import { HomeScreenProps } from '../types/rootStackParams';
import { Product } from '../types/products';
import AddToCartIcon from '../components/AddToCartIcon';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
    const { featuredProducts, birthdayProducts, isLoading, error } = useProducts();
    const { cartItems, addToCart } = useCart()
    const { state: authState } = useAuth()

    return (
        <ScrollView style={styles.container}>
   <View style={styles.content}>
                 {isLoading&& <LoadingIndicator/>}

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <AppText style={styles.title}>Welcome, {authState.user?.name}</AppText>

                    {/* <Image
                        source={require('../assets/logo.png')}
                        style={[styles.logo, { tintColor: theme.colors.primary }]} // Adjust tintColor as needed
                        resizeMode="contain"
                    /> */}
                    <AddToCartIcon itemCount={cartItems.length} onPress={() => {
                        if (cartItems.length > 0) {
                            navigation.navigate('AddToCart', { products: [] })
                        } else {
                            Alert.alert('Alert', 'Please Add Items to Cart!');

                        }
                    }} />
                </View>
                {/* Birthday Campaign Section */}
                <BirthdaySection
                    addToCartOnPress={(product: Product) => {
                        addToCart(product)

                    }}
                    onPress={(product: Product) => {
                        navigation.navigate('ProductDetails', { product })
                    }}
                    products={birthdayProducts}
                     />

                {/* Suggested Products */}
                {featuredProducts.length > 0 && (
                    <>
                        <AppText style={styles.sectionTitle}>Recommended For You</AppText>
                        <ProductList
                            addToCartOnPress={(product: Product) => {

                                const updatedProduct = {
                                    ...product,
                                    isBirthdayProduct: birthdayProducts.some(
                                        (bProduct) => bProduct._id === product._id
                                    )
                                }
                                addToCart(updatedProduct)
                            }}
                            onPress={(product: Product) => {
                                const updatedProduct = {
                                    ...product,
                                    isBirthdayProduct: birthdayProducts.some(
                                        (bProduct) => bProduct._id === product._id
                                    )
                                }
                                navigation.navigate('ProductDetails', { product: updatedProduct })
                            }}
                            products={featuredProducts} />
                    </>
                )}

            </View>
</ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        padding: RFValue(10),
    },
    title: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        marginTop: RFValue(10),
        marginBottom: RFValue(20),
        color: theme.colors.primary,
    },
    sectionTitle: {
        fontSize: RFValue(16),
        fontWeight: 'bold',
        marginTop: RFValue(17),
        marginBottom: RFValue(8),
        color: theme.colors.text,
    },
    logo: {
        width: RFValue(90),
        height: RFValue(90),
    },
});

export default HomeScreen;