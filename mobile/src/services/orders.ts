import api from './api';
import { LoginDto } from './auth';


export const createOrder = async (data: any) => {
    const response = await api.post('/orders', data);
    return response.data;
};



export const validateDiscounts = async (data: any) => {
    const response = await api.post('/discounts/validate', data);
    return response.data;
};

export const getDiscountCode = async () => {
    const response = await api.get('/discounts/birthdayVoucher');
    return response.data;
};



