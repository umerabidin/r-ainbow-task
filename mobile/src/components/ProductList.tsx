import React from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';
import { Product } from '../types/products';
import { RFValue } from 'react-native-responsive-fontsize';
import EmptyListComponent from './EmptyListComponent';

interface ProductListProps {
  products: Product[];
  onPress: (product: Product) => void;
  addToCartOnPress?: (product: Product) => void;
}
const screenWidth = Dimensions.get('window').width;
const ITEM_MARGIN = RFValue(10);
const ITEM_WIDTH = (screenWidth - ITEM_MARGIN * 3) / 2;
const ProductList: React.FC<ProductListProps> = ({ products, onPress, addToCartOnPress }) => {
  return (
    <FlatList
      data={products}
      numColumns={2}
      renderItem={({ item }) =>
        <ProductCard
          addToCartOnPress={addToCartOnPress}
          product={item} onPress={() => onPress(item)} />
      }
      keyExtractor={(item) => item._id}
      showsHorizontalScrollIndicator={false}

      columnWrapperStyle={styles.row}
      // contentContainerStyle={styles.grid}

      contentContainerStyle={{ flexGrow: 1 }}
      ListEmptyComponent={
        <EmptyListComponent emptyListText='No Data Found' />
      }
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    paddingHorizontal: ITEM_MARGIN,
    paddingBottom: RFValue(10),
  },
  row: {
    justifyContent: 'space-between', // ensures even spacing
    marginBottom: ITEM_MARGIN,
  },
});

export default ProductList;