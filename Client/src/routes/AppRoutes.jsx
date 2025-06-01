import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import BasesPage from '../pages/BasesPage';
import EquipmentTypesPage from '../pages/EquipmentTypesPage';
import PurchasesPage from '../pages/PurchasesPage';
import UsersPage from '../pages/UsersPage';
import NotFoundPage from '../pages/NotFoundPage';
import AppLayout from '../components/Layout/AppLayout';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}><Spin size="large" /></div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/bases" element={<BasesPage />} />
          <Route path="/equipment-types" element={<EquipmentTypesPage />} />
          
          <Route element={<ProtectedRoute allowedRoles={['Admin', 'LogOfficer', 'BaseCommander']} />}>
            <Route path="/purchases" element={<PurchasesPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
            <Route path="/users" element={<UsersPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;