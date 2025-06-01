import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Typography, Space, Button, Grid, Drawer, Tag } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';


const { Header, Sider, Content, Footer } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  const handleLogout = () => {
    toast.success("User LoggedOut Successfully!!");
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 1000);
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setMobileDrawerVisible(!mobileDrawerVisible);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" disabled>
        <UserOutlined /> Profile (Working On It)
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout} danger>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  const GetRoleTag = (role) => {
    let color = "purple";
    if(role === "Admin") color = "red";
    else if(role === "BaseCommander") color = "green";
    return <Tag color={color}>{role.toUpperCase()}</Tag>
  }

  return (
    <div>
      <Layout style={{ minHeight: '100vh' }}>
        {!isMobile && (
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: 1000
            }}
          >
            <div
              style={{
                height: 32,
                margin: 16,
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: 6,
                textAlign: 'center',
                lineHeight: '32px',
                color: 'white',
                overflow: 'hidden'
              }}
            >
              {collapsed ? 'AMS' : 'Asset Management System'}
            </div>
            <Sidebar />
          </Sider>
        )}

        <Drawer
          title={
            <div style={{ color: 'white' }}>
              Asset Management
            </div>
          }
          placement="left"
          onClose={() => setMobileDrawerVisible(false)}
          open={mobileDrawerVisible}
          visible={mobileDrawerVisible}
          bodyStyle={{ padding: 0, backgroundColor: '#001529' }}
          headerStyle={{ backgroundColor: '#001529', borderBottom: '1px solid #303030' }}
          width={250}
          zIndex={1001}
        >
          <Sidebar />
        </Drawer>

        <Layout
          style={{
            marginLeft: isMobile ? 0 : (collapsed ? 80 : 200),
            transition: 'margin-left 0.2s'
          }}
        >
          <Header
            style={{
              padding: '0 16px',
              background: '#fff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #f0f0f0',
              position: 'sticky',
              top: 0,
              zIndex: 999,
              width: '100%'
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleSidebar}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64
              }}
            />

            <Space align="center">
              {user && (
                <Text
                  style={{
                    marginRight: 8,
                    fontSize: isMobile ? '13px' : '16px'
                  }}
                >
                  Welcome, <Text strong style={{color: "#1677FF"}}>{user.username}</Text>, {GetRoleTag(user.role)}{user.assignedBase && !isMobile &&`- ${user.assignedBase.name}`}
                </Text>
              )}
              <Dropdown overlay={userMenu} placement="bottomRight">
                <Avatar
                  style={{
                    cursor: 'pointer'
                  }}
                  src={user.image}
                  icon={!user.image && <UserOutlined />}
                />
              </Dropdown>
            </Space>
          </Header>

          <Content
            style={{
              margin: isMobile ? '16px 8px' : '24px 16px',
              padding: isMobile ? 16 : 24,
              background: '#fff',
              minHeight: 280,
              borderRadius: '8px',
              overflow: 'initial'
            }}
          >
            <Outlet />
          </Content>

          <Footer
            style={{
              textAlign: 'center',
              background: '#f0f2f5',
              fontSize: isMobile ? '16px' : '18px',
              padding: isMobile ? '12px' : '24px',
              color: "#1677FF"
            }}
          >
            Asset Management System ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;