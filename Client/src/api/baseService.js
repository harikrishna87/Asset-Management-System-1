import apiClient from './index';

export const getAllBases = async () => {
  const response = await apiClient.get('/base/allbases');
  return response.data;
};

export const getBaseById = async (id) => {
  const response = await apiClient.get(`/base/base/${id}`);
  return response.data;
};

export const createBase = async (baseData) => {
  const response = await apiClient.post('/base/createbase', baseData);
  return response.data;
};

export const updateBase = async (id, baseData) => {
  const response = await apiClient.put(`/base/updatebase/${id}`, baseData);
  return response.data;
};

export const deleteBase = async (id) => {
  const response = await apiClient.delete(`/base/deletebase/${id}`);
  return response.data;
};