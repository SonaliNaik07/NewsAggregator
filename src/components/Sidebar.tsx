import '../Styles/Dashboard.css';

const Sidebar: React.FC = () => (
  <aside className="sidebar">
    <h2 className="logo">MyDash</h2>
    <nav>
      <ul>
        <li>Overview</li>
        <li>Reports</li>
        <li>Settings</li>
      </ul>
    </nav>
  </aside>
);

export default Sidebar;
