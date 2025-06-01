import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          fetchCurrentUser(token);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    } else {
      setLoading(false);
      setIsAuthenticated(false);
    }
  }, []);

  const fetchCurrentUser = async (token) => {
    try {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await apiClient.get('/auth/currentuser');
      if (response.data && response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      const { token, ...userData } = response.data;
      localStorage.setItem('authToken', token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      setIsAuthenticated(false);
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      const { token, ...newUserData } = response.data;
      localStorage.setItem('authToken', token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(newUserData);
      setIsAuthenticated(true);
      return { success: true, user: newUserData };
    } catch (error) {
      console.error('Registration failed:', error.response?.data?.message || error.message);
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete apiClient.defaults.headers.common['Authorization'];
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);