import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Product } from '../types/products';
import { RFValue } from 'react-native-responsive-fontsize';
import { theme } from '../types/themes';
import { formattedPrice } from '../utils/priceUtils';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ProductCardProps {
  product: Product;
  isBirthdayItem?: boolean;
  onPress?: () => void;
  addToCartOnPress?: (product: Product) => void;

}

const ProductCard: React.FC<ProductCardProps> = ({ product, isBirthdayItem = false, onPress, addToCartOnPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, isBirthdayItem && styles.birthdayCard]}
      activeOpacity={0.8}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
          {product.name}
        </Text>

        {/* Price and Rating Row */}
        <View style={styles.bottomRow}>
          {product.discountPrice ? (
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>{formattedPrice(product.price)}</Text>
              <Text style={styles.discountedPrice}>{formattedPrice(product.discountPrice)}</Text>
            </View>
          ) : (
            <Text style={styles.price}>{formattedPrice(product.price)}</Text>
          )}

          <View style={styles.ratingContainer}>
            <Icon name="star" size={RFValue(12)} color="#FFD700" />
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
          </View>
        </View>

        {isBirthdayItem && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Birthday Special</Text>
          </View>
        )}
        <TouchableOpacity
          onPress={() => addToCartOnPress!(product)}
          activeOpacity={0.9}
          style={[
            styles.primaryButton, product.quantity <= 0 && styles.disabledButton
          ]}
          disabled={product.quantity <= 0}
        >
          <Text style={styles.primaryButtonText}>
            {product.quantity > 0 ? 'Add to Cart' : 'Notify Me'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
    borderRadius: RFValue(8),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: RFValue(4),
    elevation: RFValue(2),
    marginHorizontal: RFValue(6),
    backgroundColor: theme.colors.grayLight,
    marginBottom: RFValue(12),
  },
  birthdayCard: {
    borderWidth: RFValue(2),
    borderColor: '#FF6D00',
    width: RFValue(150)
  },
  image: {
    width: '100%',
    height: RFValue(110),
    resizeMode: 'cover',
  },
  details: {
    padding: RFValue(10)
  },
  name: {
    fontSize: RFValue(12),
    fontWeight: '600',
    marginBottom: RFValue(4),
    lineHeight: RFValue(16),
    color: theme.colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: RFValue(4),
  },
  ratingText: {
    fontSize: RFValue(10),
    marginLeft: RFValue(2),
    color: theme.colors.secondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: RFValue(10),
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: RFValue(4),
  },
  discountedPrice: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: '#FF6D00',
  },
  price: {
    fontSize: RFValue(12),
    fontWeight: 'bold',
    color: theme.colors.orange,
  },
  badge: {
    position: 'absolute',
    top: -15,
    right: 5,
    backgroundColor: theme.colors.orange,
    paddingHorizontal: RFValue(6),
    paddingVertical: RFValue(2),
    borderRadius: RFValue(10),
  },
  badgeText: {
    color: 'white',
    fontSize: RFValue(10),
    fontWeight: 'bold',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    marginTop: RFValue(10),
    padding: RFValue(5),
    borderRadius: 5,
    alignItems: 'center',
    elevation: RFValue(2),

    // marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: '#CCC',
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: RFValue(12),
  },
});

export default ProductCard;