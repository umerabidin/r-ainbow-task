import api from './api';

export const fetchSuggestedProducts = async (userId: string) => {
  const response = await api.get(`/campaign/suggestions/${userId}`);
  return response.data;
};

export const generateBirthdayDiscount = async (userId: string) => {
  const response = await api.post(`/campaign/discount/${userId}`);
  return response.data;
};

export const checkBirthdayStatus = async (userId: string) => {
  const response = await api.get(`/campaign/status/${userId}`);
  return response.data;
};