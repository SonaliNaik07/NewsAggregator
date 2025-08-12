import React from 'react';
import '../Styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
  onToggleSidebar: () => void;
  onSearch: (term: string) => void;
};

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onSearch }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="header-left">
        <button className="hamburger-button" onClick={onToggleSidebar}>
          ☰
        </button>
        <h1 className="header-title">News Aggregator</h1>
      </div>

      <div className="header-right">
        <input
          type="text"
          placeholder="Search articles..."
          className="search-input"
          onChange={(e) => onSearch(e.target.value)}
        />
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
