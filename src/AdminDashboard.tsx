import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/AdminDashboard.css';
import './Styles/EditUserModal.css';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import { User } from './Types/User';

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const defaultUser: User = {
    _id: 'demo-user',
    name: 'Guest',
    email: 'guest@example.com',
    role: 'General',
    categories: [],
  };

  const user: User = JSON.parse(localStorage.getItem('user') || JSON.stringify(defaultUser));

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleDelete = async (userId: string) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;

    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter((u) => u._id !== userId));
      alert('User deleted successfully.');
    } catch (err) {
      console.error('Error deleting user:', err);
      alert('Failed to delete user.');
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
    fetchUsers();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    if (user.role !== 'Admin') {
      navigate('/dashboard');
      return;
    }
    fetchUsers();
  }, [user.role, navigate]);

  return (
    <div className="admin-dashboard">
      <h2>👩‍💼 Admin Dashboard</h2>

      <div className="admin-actions">
        <button className="logout-btn" onClick={handleLogout}>🔓 Logout</button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.categories.join(', ')}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(u)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(u._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedUser && (
        <EditUserModal user={selectedUser} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default AdminDashboard;
