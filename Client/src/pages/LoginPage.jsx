import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import { Row, Col } from 'antd';

const LoginPage = () => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Col>
        <LoginForm />
      </Col>
    </Row>
  );
};

export default LoginPage;