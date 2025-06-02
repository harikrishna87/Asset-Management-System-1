import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Spin, message, Alert } from 'antd';
import EquipmentTypeList from '../components/EquipmentTypes/EquipmentTypeList.jsx';
import EquipmentTypeFormModal from '../components/EquipmentTypes/EquipmentTypeFormModal.jsx';
import { getAllEquipmentTypes, createEquipmentType, updateEquipmentType, deleteEquipmentType } from "../api/equipmentTypeService.js"
import { useAuth } from '../contexts/AuthContext.jsx';

const { Title, Text } = Typography;

const EquipmentTypesPage = () => {
  const [equipmentTypes, setEquipmentTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEquipmentType, setEditingEquipmentType] = useState(null);
  const { user } = useAuth();

  const fetchEquipmentTypes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllEquipmentTypes();
      setEquipmentTypes(data || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch equipment types';
      setError(errorMsg);
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEquipmentTypes();
  }, [fetchEquipmentTypes]);

  const handleAdd = () => {
    setEditingEquipmentType(null);
    setIsModalVisible(true);
  };

  const handleEdit = (item) => {
    setEditingEquipmentType(item);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEquipmentType(id);
      message.success('Equipment type deleted successfully');
      fetchEquipmentTypes();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to delete equipment type');
    }
  };

  const handleCreate = async (values) => {
    try {
      await createEquipmentType(values);
      message.success('Equipment type created successfully');
      setIsModalVisible(false);
      fetchEquipmentTypes();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to create equipment type');
    }
  };

  const handleUpdate = async (id, values) => {
    try {
      await updateEquipmentType(id, values);
      message.success('Equipment type updated successfully');
      setIsModalVisible(false);
      fetchEquipmentTypes();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to update equipment type');
    }
  };

  if (loading) return <Spin tip="Loading equipment types..." size="large" style={{
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    marginTop: "225px"
  }} 
  />;
  if (error && !equipmentTypes.length) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <>
      <div style={{ marginBottom: 16, padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={2} style={{ marginBottom: 5, color: "#1677FF" }}>Equipment Types</Title>
        <Text type="secondary" style={{ fontSize: "16px" }}>Manage all types of military equipment</Text>
      </div>
      {error && <Alert message="Error" description={error} type="warning" showIcon style={{ marginBottom: 16 }} />}
      <EquipmentTypeList
        equipmentTypes={equipmentTypes}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />
      {isModalVisible && user?.role === 'Admin' && (
        <EquipmentTypeFormModal
          visible={isModalVisible}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancel={() => setIsModalVisible(false)}
          initialData={editingEquipmentType}
        />
      )}
    </>
  );
};

export default EquipmentTypesPage;