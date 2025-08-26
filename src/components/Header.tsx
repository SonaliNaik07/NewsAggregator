import React from 'react';
import '../Styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  sidebarVisible: boolean;
  onToggleSidebar: () => void;
  onSearch: (term: string) => void;
  selectedCountry: string;
  onCountryChange: (country: string) => void;
  showAuthButtons?: boolean; // 👈 New optional prop
}

const Header: React.FC<HeaderProps> = ({
  sidebarVisible,
  onToggleSidebar,
  onSearch,
  selectedCountry,
  onCountryChange,
  showAuthButtons = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <div className="header-left">
        <h1 className="header-title">News Aggregator</h1>
      </div>

      <div className="header-center">
        <input
          type="text"
          className="search-input"
          placeholder="Search articles..."
          onChange={(e) => onSearch(e.target.value)}
        />
        <select
          className="country-dropdown"
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
        >
          <option value="us">United States</option>
          <option value="in">India</option>
          <option value="gb">United Kingdom</option>
          <option value="au">Australia</option>
          <option value="ca">Canada</option>
          <option value="jp">Japan</option>
          <option value="de">Germany</option>
          <option value="fr">France</option>
          <option value="br">Brazil</option>
        </select>
      </div>

      <div className="header-right">
        {showAuthButtons && (
          <>
            <button className="auth-button login-btn" onClick={() => navigate('/login')}>
              Sign In
            </button>
            <button className="auth-button signup-btn" onClick={() => navigate('/register')}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
