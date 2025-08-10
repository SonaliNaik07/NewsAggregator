import React from 'react';
import '../Styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1>News Aggregator</h1>
      <div className="header-right">
        {/* Add other header items here if needed */}

        <div className="user-avatar" onClick={() => navigate('/user-dashboard')}>
          <img
            src="/assets/user-icon.png"
            alt="User"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

