import { FlatList, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Product } from "../types/products";
import ProductCard from "./ProductCard";
import { RFValue } from "react-native-responsive-fontsize";
import { theme } from "../types/themes";

interface BirthdaySectionProps {
  products: Product[];
  
  onPress: (product: Product) => void;
  addToCartOnPress?: (product: Product) => void;

}

const BirthdaySection: React.FC<BirthdaySectionProps> = ({ products,  onPress, addToCartOnPress }) => {
  const { state: authState } = useAuth();

  if (!authState.user || products.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 Happy Birthday! 🎉</Text>
      <Text style={styles.subtitle}>
        Enjoy these special offers for your birthday week!
      </Text>
      <Text style={styles.discountCode}>
        Use code: <Text style={styles.code}>{authState.user.discount?.code}</Text> for {authState.user.discount?.discountPercentage}% off!
      </Text>
      <Text style={styles.sectionTitle}>Suggested for you:</Text>
      <FlatList
        horizontal
        data={products}
        renderItem={({ item }) => <ProductCard product={item}
          addToCartOnPress={addToCartOnPress}
          onPress={() => onPress(item)}
          isBirthdayItem />}
        keyExtractor={item => `birthdayItem` + item._id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: RFValue(17),
    padding: RFValue(10),
    backgroundColor: '#FFF8E1',
    borderRadius: RFValue(9),
  },
  title: {
    fontSize: RFValue(17),
    fontWeight: 'bold',
    color: theme.colors.orange,
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: RFValue(12),
    color: '#555',
    marginBottom: RFValue(9),
    textAlign: 'center',
  },
  discountCode: {
    fontSize: RFValue(13),
    fontWeight: '600',
    color: theme.colors.lightBlack,
    marginBottom: RFValue(13),
    textAlign: 'center',
  },
  code: {
    fontWeight: 'bold',
    color: theme.colors.orange,
  },
  sectionTitle: {
    fontSize: RFValue(15),
    fontWeight: 'bold',
    marginBottom: RFValue(9),
    color: theme.colors.lightBlack,
  },
});

export default BirthdaySection;