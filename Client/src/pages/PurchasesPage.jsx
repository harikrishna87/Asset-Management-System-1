import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Spin, message, Alert } from 'antd';
import PurchaseList from '../components/Purchases/PurchaseList';
import PurchaseFormModal from '../components/Purchases/PurchaseFormModal';
import { getAllPurchases, createPurchase } from '../api/purchaseService';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const PurchasesPage = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useAuth();
  const canView = user?.role === 'Admin' || user?.role === 'LogOfficer' || user?.role === 'BaseCommander';

  const fetchPurchases = useCallback(async () => {
    if (!canView) {
        setError("You do not have permission to view purchases.");
        setLoading(false);
        return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getAllPurchases();
      setPurchases(data || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch purchases';
      setError(errorMsg);
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [canView]);

  useEffect(() => {
    fetchPurchases();
  }, [fetchPurchases]);

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleCreate = async (values) => {
    try {
      await createPurchase(values);
      message.success('Purchase recorded successfully');
      setIsModalVisible(false);
      fetchPurchases();
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to record purchase');
    }
  };
  
  if (!canView && !loading) return <Alert message="Access Denied" description="You do not have permission to view this page." type="error" showIcon />;
  if (loading) return <Spin tip="Loading purchases..." size="large" style={{ display: 'block', marginTop: '50px' }} />;
  if (error && !purchases.length) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <>
      <div style={{ marginBottom: 16, padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={2} style={{ marginBottom: 5, color: "#1677FF" }}>Equipment Purchases</Title>
        <Text type="secondary" style={{fontSize: "16px"}}>Log and view all equipment procurement</Text>
      </div>
      {error && <Alert message="Error" description={error} type="warning" showIcon style={{ marginBottom: 16 }} />}
      <PurchaseList
        purchases={purchases}
        onAdd={handleAdd}
      />
      {isModalVisible && (user?.role === 'Admin' || user?.role === 'LogOfficer') && (
        <PurchaseFormModal
          visible={isModalVisible}
          onCreate={handleCreate}
          onCancel={() => setIsModalVisible(false)}
        />
      )}
    </>
  );
};

export default PurchasesPage;