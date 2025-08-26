import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import GuestDashboard from './GuestDashboard';
import Dashboard from './Dashboard';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const defaultUser = {
    id: 'demo-user',
    role: 'Guest',
    interests: [],
  };

  const user = JSON.parse(localStorage.getItem('user') || JSON.stringify(defaultUser));

  const isAdmin = user.role === 'Admin';
  const isGuest = user.role === 'Guest';

  return (
    <Router>
      <Routes>
        {/* 👇 Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* 👇 Role-based dashboard */}
        <Route
          path="/dashboard"
          element={
            isAdmin ? (
              <Navigate to="/admin-dashboard" />
            ) : isGuest ? (
              <GuestDashboard />
            ) : (
              <Dashboard />
            )
          }
        />

        {/* 👇 Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👇 Admin route */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>

      <ToastContainer />
    </Router>
  );
};

export default App;
