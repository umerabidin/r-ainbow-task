import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { isBirthdayWeek } from '../utils/dateUtils';
import { ProductsState } from '../types/states';
import { fetchBirthdayProducts, fetchProducts,  fetchTags } from '../services/products';
import { getCatchBlockError } from './CatchErrorHandling';
import { Product } from '../types/products';

const ProductsContext = createContext<ProductsState | undefined>(undefined);

export const ProductsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<ProductsState>({
        featuredProducts: [],
        birthdayProducts: [],
        tags: [],
        isLoading: false,
        error: null,
    });

    const { state: authState } = useAuth();

    useEffect(() => {
        const loadProducts = async () => {
            setState((prev: ProductsState) => ({ ...prev, isLoading: true, error: null }));

            try {
                const featured = await fetchProducts();
                const updatedProducts = featured.map((product: Product) => ({
                    ...product,
                    isBirthdayProduct: false
                }))
                setState((prev: ProductsState) => ({ ...prev, featuredProducts: updatedProducts, isLoading: false }));
            } catch (error: any) {
                setState((prev: ProductsState) => ({ ...prev, isLoading: false, error: error?.message! }));
            }
        };

        loadProducts();
    }, [authState.user]);



    useEffect(() => {
        const loadUserPreferences = async () => {
            setState((prev: ProductsState) => ({ ...prev, isLoading: true, error: null }));
            try {
                const { tags } = await fetchTags();
                setState((prev: ProductsState) => ({ ...prev, tags: tags, isLoading: false }));
            } catch (error: any) {
                setState((prev: ProductsState) => ({ ...prev, isLoading: false, error: error?.message! }));
            }
        };

        loadUserPreferences();
    }, [authState.user]);

    useEffect(() => {
        const loadBirthdayProducts = async () => {

            if (authState.user && isBirthdayWeek(authState.user.dateOfBirth)) {
                setState((prev: ProductsState) => ({ ...prev, isLoading: true, error: null }));
                try {

                    const { products } = await fetchBirthdayProducts();

                    const updatedProducts = products.map((product: Product) => ({
                        ...product,
                        isBirthdayProduct: true
                    }))


                    setState((prev: ProductsState) => ({ ...prev, birthdayProducts: updatedProducts, isLoading: false }));
                } catch (error: any) {
                    setState((prev: ProductsState) => ({ ...prev, isLoading: false, error: getCatchBlockError(error) }));
                }
            }
        };

        loadBirthdayProducts();
    }, [authState.user]);

    return (
        <ProductsContext.Provider value={state}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
};