// contexts/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/products';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';
import { User } from '../types/auth';

interface CartItem extends Product {
    cartQuantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    updateQuantity: (productId: string, newQuantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const { state: authState } = useAuth();

    // Load cart from database/async storage on mount
    useEffect(() => {
        const loadCart = async () => {
            console.log("user.id => ", authState.user?._id);
            try {
                // Replace with your actual database fetch
                const savedCart = await AsyncStorage.getItem(authState.user?._id + 'cart_items');
                console.log(savedCart);

                if (savedCart) {
                    setCartItems(JSON.parse(savedCart));
                } else {
                    setCartItems([]);
                }
            } catch (error) {
                console.error('Failed to load cart', error);
            }

        };
        loadCart();
    }, [authState.user]);

    // Save cart to database/async storage whenever it changes
    useEffect(() => {
        const saveCart = async () => {
           
            try {
                await AsyncStorage.setItem(authState.user?._id + 'cart_items', JSON.stringify(cartItems));
            } catch (error) {
                console.error('Failed to save cart', error);
            }
        };
        saveCart();
    }, [cartItems]);

    const addToCart = (product: Product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item._id === product._id);
            if (existingItem) {
                return prevItems.map(item =>
                    item._id === product._id
                        ? { ...item, cartQuantity: item.cartQuantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, cartQuantity: 1 }];
            }
        });
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item._id === productId ? { ...item, cartQuantity: newQuantity } : item
            )
        );
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
    };

    const clearCart = async () => {
       
        await AsyncStorage.removeItem(authState.user?._id + 'cart_items');
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};