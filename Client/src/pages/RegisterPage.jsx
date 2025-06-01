import React from 'react';
import RegisterForm from '../components/Auth/RegisterForm';
import { Row, Col } from 'antd';

const RegisterPage = () => {
  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Col>
        <RegisterForm />
      </Col>
    </Row>
  );
};

export default RegisterPage;