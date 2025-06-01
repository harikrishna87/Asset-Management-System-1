import apiClient from './index';

export const getAllEquipmentTypes = async () => {
  const response = await apiClient.get('/equipmenttype/allequipmenttypes');
  return response.data;
};

export const getEquipmentTypeById = async (id) => {
  const response = await apiClient.get(`/equipmenttype/equipmenttype/${id}`);
  return response.data;
};

export const createEquipmentType = async (data) => {
  const response = await apiClient.post('/equipmenttype/createequipmenttype', data);
  return response.data;
};

export const updateEquipmentType = async (id, data) => {
  const response = await apiClient.put(`/equipmenttype/updateequipmenttype/${id}`, data);
  return response.data;
};

export const deleteEquipmentType = async (id) => {
  const response = await apiClient.delete(`/equipmenttype/deleteequipmenttype/${id}`);
  return response.data;
};