import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminDashboard from './components/AdminDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import EmployeeDashboard from './components/EmployeeDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path ="/" element = {<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/admin"
        element={<PrivateRoute roles={['superadmin', 'admin']} component={AdminDashboard} />}
      />
      <Route
        path="/manager"
        element={<PrivateRoute roles={['manager']} component={ManagerDashboard} />}
      />
      <Route
        path="/employee"
        element={<PrivateRoute roles={['employee']} component={EmployeeDashboard} />}
      />
    </Routes>
  );
}

export default App;
