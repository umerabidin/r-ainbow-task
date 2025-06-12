import api from './api';

export const fetchProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const fetchRecommendedProducts = async (userId: string | undefined) => {
    const response = await api.get(`/products/recommended/${userId}`);
    return response.data;
};

export const fetchBirthdayProducts = async () => {
    const response = await api.get(`/products/recommend`);
    return response.data;
};

export const fetchTags = async () => {
    const response = await api.get(`/tags`);
    return response.data;
};