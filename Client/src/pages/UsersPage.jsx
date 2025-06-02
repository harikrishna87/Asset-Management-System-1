import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Spin, message, Alert } from 'antd';
import UserList from '../components/Users/UserList';
import { getAllUsers } from '../api/authService';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user: currentUser } = useAuth();

  const fetchUsers = useCallback(async () => {
    if (currentUser?.role !== 'Admin') {
      setError("Access Denied: You must be an Admin to view users.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      setUsers(data.users || []);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch users';
      setError(errorMsg);
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (currentUser?.role !== 'Admin' && !loading) {
    return <Alert message="Access Denied" description="You do not have permission to view this page." type="error" showIcon />;
  }

  if (loading) return <Spin tip="Loading users..." size="large" style={{
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    marginTop: "225px"
  }}
  />;
  if (error && !users.length) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
    <>
      <div style={{ marginBottom: 16, padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={2} style={{ marginBottom: 5, color: "#1677FF" }}>System Users</Title>
        <Text type="secondary" style={{ fontSize: "16px" }}>Manage and view all registered users</Text>
      </div>
      {error && <Alert message="Error" description={error} type="warning" showIcon style={{ marginBottom: 16 }} />}
      <UserList users={users} />
    </>
  );
};

export default UsersPage;