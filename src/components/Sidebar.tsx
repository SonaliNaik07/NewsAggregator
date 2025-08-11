import React from 'react';
import '../Styles/Dashboard.css';

type SidebarProps = {
  visible: boolean;
  onToggle: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ visible, onToggle }) => {
  return (
    <div className={`sidebar ${visible ? 'visible' : 'hidden'}`}>
      {visible && (
        <>
          <button className="close-button" onClick={onToggle}>
            ×
          </button>

          <h2 className="logo">MyDash</h2>
          <nav>
            <ul>
              <li>Overview</li>
              <li>Reports</li>
              <li>Settings</li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};

export default Sidebar;
