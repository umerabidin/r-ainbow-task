import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthNavigator from './AuthNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppParamsList } from '../types/rootStackParams';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import AddToCartScreen from '../screens/AddToCartScreen';

const Stack = createNativeStackNavigator<AppParamsList>();

const HomeNavigator = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
      <Stack.Screen name="AddToCart" component={AddToCartScreen} />
      <Stack.Screen name="Auth" component={AuthNavigator} />

    </Stack.Navigator>
  );
};

export default HomeNavigator;