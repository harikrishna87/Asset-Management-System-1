import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Typography, Card, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getAllBases } from '../../api/baseService';
import { toast } from 'react-toastify';

const { Title } = Typography;
const { Option } = Select;

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [role, setRole] = useState('');
  const [bases, setBases] = useState([]);
  const [loadingBases, setLoadingBases] = useState(false);

  useEffect(() => {
    const fetchBases = async () => {
      if (role === 'BaseCommander' || role === 'LogOfficer') {
        setLoadingBases(true);
        try {
          const data = await getAllBases();
          setBases(data || []);
        } catch (error) {
          toast.error('Could not load bases for assignment.');
        } finally {
          setLoadingBases(false);
        }
      }
    };
    fetchBases();
  }, [role]);

  const onFinish = async (values) => {
    const payload = { ...values };
    if (values.role === 'Admin') {
      delete payload.assignedBaseId;
    }
    const result = await register(payload);
    if (result.success) {
      toast.success('Registration successful! Redirecting to Login...');
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else {
      toast.error('Registration failed. Please try again.');
    }
  };

  const handleRoleChange = (value) => {
    setRole(value);
    form.setFieldsValue({ assignedBaseId: undefined });
  };

  const handleNavigate = () => {
    navigate('/login');
  }

  return (
    <>
      <Card style={{ width: 450, margin: '50px auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: "15px" }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={3} style={{ color: "#1677FF" }}>Asset Management</Title>
        </div>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
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
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="role"
            rules={[{ required: true, message: 'Please select a role!' }]}
          >
            <Select placeholder="Select a role" onChange={handleRoleChange}>
              <Option value="Admin">Admin</Option>
              <Option value="BaseCommander">BaseCommander</Option>
              <Option value="LogOfficer">LogOfficer</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="image"
            rules={[
              { required: true, message: 'Please provide an image URL!' },
              { type: 'url', message: 'Please enter a valid URL!' }
            ]}
          >
            <Input type="url" placeholder="Please enter an image URL" />
          </Form.Item>

          {(role === 'BaseCommander' || role === 'LogOfficer') && (
            <Form.Item
              name="assignedBaseId"
              rules={[{ required: true, message: 'Please select an assigned base!' }]}
            >
              <Select placeholder="Select assigned base" loading={loadingBases} disabled={loadingBases}>
                {bases.map(base => (
                  <Option key={base._id} value={base._id}>{base.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Register Now
            </Button>
          </Form.Item>

          <Divider style={{ borderColor: '#D3D3D3' }}>or </Divider>

          <div style={{ textAlign: 'center' }}>
            Already have an account? <a onClick={handleNavigate} style={{ fontSize: "18px" }}>Login here!</a>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default RegisterForm;