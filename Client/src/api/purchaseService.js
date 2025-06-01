import apiClient from './index';

export const getAllPurchases = async () => {
  const response = await apiClient.get('/purchase/allpurchases');
  return response.data;
};

export const createPurchase = async (data) => {
  const response = await apiClient.post('/purchase/createpurchase', data);
  return response.data;
};