import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Product } from '../types/products';
import { AddToCartScreenProps } from '../types/rootStackParams';
import { useCart } from '../context/CartContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { createOrder, validateDiscounts } from '../services/orders';
import { getCatchBlockError } from '../context/CatchErrorHandling';
import { LoadingIndicator } from '../components/common';
import { useAuth } from '../context/AuthContext';



interface CartItem extends Product {
    cartQuantity: number;
}

const AddToCartScreen = ({ route, navigation }: AddToCartScreenProps) => {
    const { products } = route.params;
    const { cartItems, addToCart, updateQuantity, removeFromCart, clearCart } = useCart()
    const [isLoading, setIsLoading] = useState(false)
    const [voucherCode, setVoucherCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(false);
    const [validVoucher, setValidVoucher] = useState(false);
    const { state: authState } = useAuth()
    const discountedPercentage = authState.user?.discount?.discountPercentage
    
    if (cartItems.length == 0) {
        navigation.pop()
    }

    // Validate voucher code
    const validateVoucher = async () => {
        // In a real app, you would call an API to validate
        try {

            if (voucherCode && voucherCode.length > 0) {
                setIsLoading(true)

                const { message, isSuccessfull, discountPercentage } = await validateDiscounts({ 'code': voucherCode })
                if (discountPercentage) {
                    setValidVoucher(true);
                    setAppliedDiscount(true);
                } else {
                    setValidVoucher(false);
                    Alert.alert('Invalid', message);
                }
            } else {
                setValidVoucher(false);
                Alert.alert('Invalid', 'Please enter a valid voucher code');
            }

        } catch (error) {

            Alert.alert('Invalid', getCatchBlockError(error));



        } finally {
            setIsLoading(false)
        }
    };

    // Calculate totals
    const calculateTotals = () => {
        let subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);
        let discount = 0;

        if (appliedDiscount) {
            // Apply 20% discount only to birthday products
            const birthdayItemsTotal = cartItems
                .filter(item => item.isBirthdayProduct)
                .reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);

            discount = birthdayItemsTotal * 0.2;
        }

        return {
            subtotal,
            discount,
            total: subtotal - discount,
            discountApplied: discount > 0
        };
    };

    const { subtotal, discount, total, discountApplied } = calculateTotals();


    const prepareCheckoutData = (cartItems: CartItem[], appliedDiscount: boolean, voucherCode: string) => {
        // Calculate individual discounts (20% off for birthday products if voucher applied)
        setIsLoading(true)
        const products = cartItems.map(item => {
            const isDiscounted = item.isBirthdayProduct && appliedDiscount
            const discount = isDiscounted ? item.price * item.cartQuantity * (discountedPercentage ? discountedPercentage : 100) / 100 : 0;

            return {
                productId: item._id,
                price: item.price,
                quantity: item.cartQuantity,
                discount: Math.round(discount) // Round to avoid decimals
            };
        });

        // Calculate totals
        const subtotal = products.reduce((sum, product) =>
            sum + (product.price * product.quantity), 0);
        const discountAmount = products.reduce((sum, product) =>
            sum + product.discount, 0);
        const totalAmount = subtotal - discountAmount;

        return {
            products,
            totalAmount: Math.round(totalAmount),
            discountAmount: Math.round(discountAmount),
            discountCode: appliedDiscount ? voucherCode : null,
            paymentMethod: "COD", // Default to COD, can be changed
            status: "PENDING"
        };
    };


    const handleProceedToCheckout = () => {
        Alert.alert("Alert!", "Are you sure you want to place your order?", [{
            text: 'Yes', onPress: () => requestCreateOrder()
        }, {
            text: 'No'
        }])

    };

    const requestCreateOrder = async () => {
        const checkoutData = prepareCheckoutData(cartItems, appliedDiscount, voucherCode);
        try {
            const { order } = await createOrder(checkoutData)
            Alert.alert('🎉 Hurrah! 🎉', `Your order has been please, you will be notify via email about the progress of your order with \n OrderId.${order._id}`, [
                {
                    text: "OK",
                    onPress: () => {
                        clearCart()
                        navigation.pop()
                    }
                }
            ],
                { cancelable: false });

            // Navigate to order confirmation screen
            // navigation.navigate('OrderConfirmation', { orderId: result.orderId });
        } catch (error) {
            getCatchBlockError(error)
            Alert.alert('Error', 'Failed to place order. Please try again.');
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Available Products */}
                <Text style={styles.sectionTitle}>Available Products</Text>
                {products?.map(product => (
                    <View key={product._id} style={styles.productCard}>
                        <Image source={{ uri: product.image }} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <View style={styles.priceRow}>
                                <Text style={styles.price}>${(product.price / 100).toFixed(2)}</Text>
                                {product.isBirthdayProduct && (
                                    <View style={styles.birthdayBadge}>
                                        <Icon name="cake" size={16} color="white" />
                                        <Text style={styles.badgeText}>Birthday Special</Text>
                                    </View>
                                )}
                            </View>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={() => addToCart(product)}
                            >
                                <Text style={styles.addButtonText}>Add to Cart</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {/* Cart Items */}
                {cartItems.length > 0 && (
                    <>
                        <Text style={styles.sectionTitle}>Your Cart ({cartItems.length})</Text>
                        {cartItems.map(item => (
                            <View key={item._id} style={styles.cartItem}>
                                <Image source={{ uri: item.image }} style={styles.cartItemImage} />
                                <View style={styles.cartItemDetails}>
                                    <Text style={styles.cartItemName}>{item.name}</Text>
                                    <Text style={styles.cartItemPrice}>${(item.price / 100).toFixed(2)}</Text>

                                    {item.isBirthdayProduct && appliedDiscount && (
                                        <View style={styles.discountBadge}>
                                            <Icon name="local-offer" size={14} color="#4CAF50" />
                                            <Text style={styles.discountText}>{discountedPercentage}% OFF</Text>
                                        </View>
                                    )}
                                    <View style={styles.quantityControls}>
                                        <TouchableOpacity
                                            onPress={() => updateQuantity(item._id, item.cartQuantity - 1)}
                                            style={styles.quantityButton}
                                        >
                                            <Icon name="remove" size={20} color="#333" />
                                        </TouchableOpacity>

                                        <Text style={styles.quantityText}>{item.cartQuantity}</Text>

                                        <TouchableOpacity
                                            onPress={() => updateQuantity(item._id, item.cartQuantity + 1)}
                                            style={styles.quantityButton}
                                        >
                                            <Icon name="add" size={20} color="#333" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() => removeFromCart(item._id)}
                                >
                                    <Icon name="delete" size={20} color="#FF6B6B" />
                                </TouchableOpacity>
                            </View>
                        ))}

                        {/* Voucher Code Section */}
                        <View style={styles.voucherContainer}>
                            <Text style={styles.sectionTitle}>Have a Voucher?</Text>
                            <View style={styles.voucherInputRow}>
                                <TextInput
                                    style={[
                                        styles.voucherInput,
                                        validVoucher && styles.validVoucherInput
                                    ]}
                                    placeholder="Enter voucher code"
                                    value={voucherCode}
                                    onChangeText={setVoucherCode}
                                    editable={!appliedDiscount}
                                />
                                <TouchableOpacity
                                    style={[
                                        styles.validateButton,
                                        appliedDiscount && styles.appliedButton
                                    ]}
                                    onPress={validateVoucher}
                                    disabled={appliedDiscount}
                                >
                                    <Text style={styles.validateButtonText}>
                                        {appliedDiscount ? 'Applied' : 'Validate'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
            </ScrollView>

            {/* Order Summary */}
            {cartItems.length > 0 && (
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal:</Text>
                        <Text style={styles.summaryValue}>${(subtotal / 100).toFixed(2)}</Text>
                    </View>

                    {discountApplied && (
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Birthday Discount:</Text>
                            <Text style={[styles.summaryValue, styles.discountText]}>
                                -${(discount / 100).toFixed(2)}
                            </Text>
                        </View>
                    )}

                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryLabel, styles.totalLabel]}>Total:</Text>
                        <Text style={[styles.summaryValue, styles.totalValue]}>
                            ${(total / 100).toFixed(2)}
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.checkoutButton}
                        onPress={() => handleProceedToCheckout()}
                        activeOpacity={0.8}>
                        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>
            )}
            {isLoading && <LoadingIndicator />}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        padding: 16,
        paddingBottom: 150,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 16,
        color: '#333',
    },
    productCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    productImage: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    productInfo: {
        flex: 1,
        padding: 12,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    birthdayBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FF6B6B',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginLeft: 8,
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    addButton: {
        backgroundColor: '#FF6B6B',
        borderRadius: 4,
        padding: 8,
        alignItems: 'center',
        marginTop: 4,
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cartItemImage: {
        width: 60,
        height: 60,
        borderRadius: 4,
    },
    cartItemDetails: {
        flex: 1,
        marginLeft: 12,
    },
    cartItemName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    cartItemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    discountText: {
        fontSize: 12,
        color: '#4CAF50',
        marginBottom: 8,

    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    discountBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    quantityButton: {
        padding: 6,
    },
    quantityText: {
        marginHorizontal: 12,
        fontSize: 16,
    },
    removeButton: {
        justifyContent: 'center',
        paddingLeft: 8,
    },
    voucherContainer: {
        backgroundColor: 'white',
        borderRadius: RFValue(7),
        padding: RFValue(13),
        marginTop: RFValue(11),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: RFValue(3),
        elevation: RFValue(2),
    },
    voucherInputRow: {
        flexDirection: 'row',
    },
    voucherInput: {
        flex: 1,
        borderWidth: RFValue(1),
        borderColor: '#ddd',
        borderRadius: RFValue(4),
        padding: RFValue(8),
        marginRight: RFValue(8),
    },
    validVoucherInput: {
        borderColor: '#4CAF50',
        backgroundColor: '#f0fff0',
    },
    validateButton: {
        backgroundColor: '#FF6B6B',
        borderRadius: RFValue(4),
        paddingHorizontal: RFValue(13),
        justifyContent: 'center',
        alignItems: 'center',
    },
    appliedButton: {
        backgroundColor: '#4CAF50',
    },
    validateButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    summaryContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: RFValue(13),
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
    },
    totalLabel: {
        fontWeight: 'bold',
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
    },

    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkoutButton: {
        backgroundColor: '#FF6B6B',
        borderRadius: RFValue(7),
        padding: RFValue(12),
        alignItems: 'center',
        marginTop: RFValue(10),
    },
    checkoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AddToCartScreen;