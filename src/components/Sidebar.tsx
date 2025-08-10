type SidebarProps = {
  visible: boolean;
  onToggle: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ visible, onToggle }) => {
  return (
    <div className={`sidebar ${visible ? '' : 'hidden'}`}>
      <button className="hamburger" onClick={onToggle}>
        ☰
      </button>

      <h2 className="logo">MyDash</h2>
      <nav>
        <ul>
          <li>Overview</li>
          <li>Reports</li>
          <li>Settings</li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
