import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/sessionManager';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import PortfolioManager from './PortfolioManager';
import BlogManager from './BlogManager';

const AdminPanel: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={isAuthenticated() ? <AdminDashboard /> : <Navigate to="/admin" />}
      />
      <Route
        path="/portfolio"
        element={isAuthenticated() ? <PortfolioManager /> : <Navigate to="/admin" />}
      />
      <Route
        path="/blog"
        element={isAuthenticated() ? <BlogManager /> : <Navigate to="/admin" />}
      />
    </Routes>
  );
};

export default AdminPanel;
