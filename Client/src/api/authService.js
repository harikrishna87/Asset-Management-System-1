import apiClient from './index';

export const getAllUsers = async () => {
  const response = await apiClient.get('/auth/allusers');
  return response.data;
};