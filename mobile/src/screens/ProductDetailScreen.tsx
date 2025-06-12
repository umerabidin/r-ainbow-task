// src/screens/ProductDetailScreen.tsx
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ProductDetailsScreenProps } from '../types/rootStackParams';
import { formattedPrice } from '../utils/priceUtils';
import { useProducts } from '../context/ProductsContext';
import { RFValue } from 'react-native-responsive-fontsize';
import { theme } from '../types/themes';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }: ProductDetailsScreenProps) => {
    const { product } = route.params;
    const { addToCart } = useCart()

    const { tags } = useProducts();
console.log("product.quantity  => ",product.quantity);

    return (
        <ScrollView style={styles.container}>
            {/* Product Image */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.image }}
                    style={styles.productImage}
                    resizeMode="contain"
                />
            </View>

            {/* Product Info Section */}
            <View style={styles.infoContainer}>
                <Text style={styles.productName}>{product.name}</Text>

                {/* Rating and Price Row */}
                <View style={styles.metaRow}>
                    <View style={styles.ratingContainer}>
                        <Icon name="star" size={18} color="#FFD700" />
                        <Text style={styles.ratingText}>{product.rating}</Text>
                    </View>
                    <Text style={styles.priceText}>{formattedPrice(product.price)}</Text>
                </View>

                {/* Stock Availability */}
                <View style={styles.stockContainer}>
                    <Icon
                        name={product.quantity > 0 ? "check-circle" : "cancel"}
                        size={18}
                        color={product.quantity > 0 ? "#4CAF50" : "#F44336"}
                    />
                    <Text style={styles.stockText}>
                        {product.quantity > 0
                            ? `In Stock (${product.quantity} available)`
                            : 'Out of Stock'}
                    </Text>
                </View>

                {/* Description Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.descriptionText}>{product.description}</Text>
                </View>

                {/* Tags Section */}
                {product.tags && product.tags.length > 0 && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Features</Text>
                        <View style={styles.tagsContainer}>
                            {product.tags.map((tag, index) => {
                                const matchedTag = tags.find(t => {
                                    return t._id === tag
                                });

                                return matchedTag ? (
                                    <View key={index} style={styles.tag}>
                                        <Text style={styles.tagText}>{`• ${matchedTag.displayName}`}</Text>
                                    </View>
                                ) : null;
                            })}
                        </View>
                    </View>
                )}

                {/* Action Buttons */}
                <View style={styles.buttonRow}>
                    {/* <TouchableOpacity style={styles.secondaryButton}>
                        <Icon name="favorite-border" size={20} color="#333" />
                        <Text style={styles.secondaryButtonText}>Wishlist</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert("Product added to cart", "", [{
                                text:"OK",
                                onPress: () => {
                                    addToCart(product)
                                    navigation.pop()
                                }

                            }],{ cancelable: true })
                        }
                        }
                        activeOpacity={0.9}
                        style={[
                            styles.primaryButton,
                            product.quantity <= 0 && styles.disabledButton
                        ]}
                        disabled={product.quantity <= 0}
                    >
                        <Text style={styles.primaryButtonText}>
                            {product.quantity > 0 ? 'Add to Cart' : 'Notify Me'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    imageContainer: {
        height: width * 0.8,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        padding: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9E6',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 14,
        color: '#333',
    },
    priceText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    stockContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    stockText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#666',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    descriptionText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#555',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        marginRight: RFValue(10),
        marginBottom: RFValue(5),

    },
    tagText: {
        fontSize: 14,
        color: '#555',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: RFValue(10),
    },
    primaryButton: {
        flex: 1,
        backgroundColor: theme.colors.cardButtonColor,
        padding: RFValue(12),
        borderRadius: RFValue(6),
        alignItems: 'center',
        elevation: RFValue(2)
        // marginLeft: 10,
    },
    disabledButton: {
        backgroundColor: '#CCC',
    },
    primaryButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
    secondaryButton: {
        flex: 0.4,
        flexDirection: 'row',
        backgroundColor: '#EEE',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    secondaryButtonText: {
        marginLeft: 5,
        color: '#333',
        fontSize: 14,
    },
});

export default ProductDetailScreen;