import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Spin, message, Alert } from 'antd';
import BaseList from '../components/Bases/BaseList';
import BaseFormModal from '../components/Bases/BaseFormModal';
import { getAllBases, createBase, updateBase, deleteBase } from '../api/baseService';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const BasesPage = () => {
  const [bases, setBases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBase, setEditingBase] = useState(null);
  const { user } = useAuth();

  const fetchBases = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllBases();
      setBases(data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch bases');
      message.error(err.response?.data?.message || 'Failed to fetch bases');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBases();
  }, [fetchBases]);

  const handleAdd = () => {
    setEditingBase(null);
    setIsModalVisible(true);
  };

  const handleEdit = (base) => {
    setEditingBase(base);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBase(id);
      message.success('Base deleted successfully');
      fetchBases();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to delete base');
    }
  };

  const handleCreate = async (values) => {
    try {
      await createBase(values);
      message.success('Base created successfully');
      setIsModalVisible(false);
      fetchBases();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to create base');
    }
  };

  const handleUpdate = async (id, values) => {
    try {
      await updateBase(id, values);
      message.success('Base updated successfully');
      setIsModalVisible(false);
      fetchBases();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to update base');
    }
  };

  if (loading) {
    return (
      <Spin 
        tip="Loading bases..." 
        size="large" 
        style={{ 
          display: 'block', 
          marginTop: '50px',
        }} 
      />
    );
  }

  if (error && !bases.length) {
    return (
      <Alert 
        message="Error" 
        description={error} 
        type="error" 
        showIcon 
      />
    );
  }

  return (
    <div>
      <div style={{ 
        marginBottom: 16, 
        padding: '16px 0', 
        borderBottom: '1px solid #f0f0f0'
      }}>
        <Title level={2} style={{ marginBottom: 5, color: "#1677FF"}}>
          Military Bases
        </Title>
        <Text type="secondary" style={{fontSize: "16px"}}>
          Manage all military bases
        </Text>
      </div>

      {error && (
        <Alert 
          message="Error" 
          description={error} 
          type="warning" 
          showIcon 
          style={{ 
            marginBottom: 16,
          }} 
        />
      )}

      <BaseList
        bases={bases}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
      />

      {isModalVisible && user?.role === 'Admin' && (
        <BaseFormModal
          visible={isModalVisible}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancel={() => setIsModalVisible(false)}
          initialData={editingBase}
        />
      )}
    </div>
  );
};

export default BasesPage;