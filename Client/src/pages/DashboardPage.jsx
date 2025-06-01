import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Statistic, Spin } from 'antd';
import { HomeOutlined, ToolOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getAllBases } from '../api/baseService';
import { getAllEquipmentTypes } from '../api/equipmentTypeService';
import { getAllPurchases } from '../api/purchaseService';
import { getAllUsers } from '../api/authService';

const { Title, Paragraph, Text } = Typography;

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    bases: 0,
    equipmentTypes: 0,
    purchases: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [basesData, equipmentTypesData, purchasesData, usersData] = await Promise.all([
          getAllBases().catch(() => []),
          getAllEquipmentTypes().catch(() => []),
          user?.role === 'Admin' || user?.role === 'LogOfficer' || user?.role === 'BaseCommander' 
            ? getAllPurchases().catch(() => []) 
            : Promise.resolve([]),
          user?.role === 'Admin' 
            ? getAllUsers().catch(() => ({ users: [] })) 
            : Promise.resolve({ users: [] })
        ]);

        setStats({
          bases: basesData.length,
          equipmentTypes: equipmentTypesData.length,
          purchases: purchasesData.length,
          users: usersData.users.length
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <Spin size="large" tip="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div>
      <Title level={2} style={{color: "#1677FF"}}>{user.role} Dashboard</Title>
      <Paragraph style={{fontSize: "16px"}}>
        Welcome back, <Text strong style={{color: "#1677FF"}}>{user?.username}</Text>! Here's an overview of the system.
      </Paragraph>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card hoverable onClick={() => navigate('/bases')} style={{ cursor: 'pointer' }}>
            <Statistic
              title={<span style={{color: "#1677FF", fontSize: "18px"}}>Managed Bases</span>}
              value={stats.bases}
              prefix={<HomeOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card hoverable onClick={() => navigate('/equipment-types')} style={{ cursor: 'pointer' }}>
            <Statistic
              title = {<span style={{color: "#1677FF", fontSize: "18px"}}>Equipment Types</span>}
              value={stats.equipmentTypes}
              prefix={<ToolOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        {(user?.role === 'Admin' || user?.role === 'LogOfficer' || user?.role === 'BaseCommander') && (
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card hoverable onClick={() => navigate('/purchases')} style={{ cursor: 'pointer' }}>
              <Statistic
                title={<span style={{color: "#1677FF", fontSize: "18px"}}>Total Purchases</span>}
                value={stats.purchases}
                prefix={<ShoppingCartOutlined />}
                valueStyle={{ color: 'purple' }}
              />
            </Card>
          </Col>
        )}
        {user?.role === 'Admin' && (
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card hoverable onClick={() => navigate('/users')} style={{ cursor: 'pointer' }}>
              <Statistic
                title={<span style={{color: "#1677FF", fontSize: "18px"}}>System Users</span>}
                value={stats.users}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
        )}
      </Row>

      {user?.assignedBase && (
        <Card style={{ marginTop: 24 }}>
          <Title level={3} style={{color: "#1677FF"}}>Your Assigned Base</Title>
          <Paragraph style={{fontSize: "16px"}}>
            You are currently associated with: <Text strong style={{color: "#1677FF"}}>{user.assignedBase.name}</Text> located at <Text strong style={{color: "#1677FF"}}>{user.assignedBase.location}</Text>.
          </Paragraph>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;