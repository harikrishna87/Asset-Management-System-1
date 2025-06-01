import React from 'react';
import { Form, Input, Button, Typography, Card, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const { Title } = Typography;

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const result = await login(values);
    if (result.success) {
      toast.success("User LoggedIn Successfully!");
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      toast.error('Login failed, Please check your credentials.');
    }
  };

  const handleNavigate = () => {
    navigate('/register');
  }

  return (
    <>
      <Card style={{ width: 450, margin: '50px auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: "15px" }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ color: "#1677FF" }}>Asset Management</Title>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Login Now
            </Button>
          </Form.Item>

          <Divider style={{ borderColor: '#D3D3D3' }}>or </Divider>

          <div style={{ textAlign: 'center' }}>
            Don't have an Account ? <a onClick={handleNavigate} style={{ fontSize: "18px" }}>register now!</a>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default LoginForm;