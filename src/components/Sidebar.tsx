import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/Dashboard.css';

type SidebarProps = {
  visible: boolean;
  onToggle: () => void;
  handleLogout: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ visible, onToggle, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = () => {
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard');
    } else {
      window.location.reload(); // Optional: refresh if already on dashboard
    }
  };

  return (
    <aside className={`sidebar ${visible ? 'visible' : 'hidden'}`}>
      <button className="close-button" onClick={onToggle}>
        ×
      </button>

      <h2 className="logo">MyDash</h2>

      <nav className="sidebar-nav">
        <button className="sidebar-link" onClick={goHome}>
          🏠 Home
        </button>
        <button className="sidebar-link" onClick={handleLogout}>
          🔓 Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
