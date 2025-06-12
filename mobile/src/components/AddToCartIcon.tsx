import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons'; // Or any other icon pack you prefer

type AddToCartIconProps = {
    itemCount: number;
    onPress: () => void;
};

const AddToCartIcon: React.FC<AddToCartIconProps> = ({ itemCount, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Icon name="cart-outline" size={30} color="#000" />
            {itemCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{itemCount > 99 ? '99+' : itemCount.toString()}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default AddToCartIcon;

const styles = StyleSheet.create({
    container: {
        padding: RFValue(10),
    },
    badge: {
        position: 'absolute',
        right: RFValue(5),
        top: RFValue(5),
        backgroundColor: 'red',
        borderRadius: RFValue(10),
        paddingHorizontal: RFValue(2),
        paddingVertical: RFValue(3),
        minWidth: RFValue(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: RFValue(10),
        fontWeight: 'bold',
    },
});