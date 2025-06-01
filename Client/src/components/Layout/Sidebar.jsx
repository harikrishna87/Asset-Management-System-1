import React from 'react';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ToolOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: <Link to="/dashboard">Dashboard</Link> },
    { key: '/bases', icon: <HomeOutlined />, label: <Link to="/bases">Bases</Link> },
    { key: '/equipment-types', icon: <ToolOutlined />, label: <Link to="/equipment-types">Equipment Types</Link> },
    { key: '/purchases', icon: <ShoppingCartOutlined />, label: <Link to="/purchases">Purchases</Link> },
  ];

  if (user && user.role === 'Admin') {
    menuItems.push({ key: '/users', icon: <UserOutlined />, label: <Link to="/users">Users</Link> });
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={menuItems}
      style={{ 
        borderRight: 0,
        fontFamily: '"Times New Roman", Times, serif'
      }}
    />
  );
};

export default Sidebar;