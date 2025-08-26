import React, { useState, useEffect } from 'react';
import './Styles/EditUserModal.css';
import { User } from './Types/User';

interface EditUserModalProps {
  user: User;
  onClose: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose }) => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    role: string;
    categories: string[];
    status: string;
  }>({
    name: '',
    email: '',
    role: '',
    categories: [],
    status: 'active'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        categories: user.categories || [],
        status: user.status || 'active'
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoriesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const categoriesArray = value.split(',').map(cat => cat.trim());
    setFormData(prev => ({ ...prev, categories: categoriesArray }));
  };

  const handleSubmit = async () => {
    if (formData.role !== 'Admin' && formData.categories.length === 0) {
      alert('Non-admin users must have at least one category.');
      return;
    }

    try {
      const res = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('User updated successfully');
        onClose();
      } else {
        const error = await res.json();
        alert(error.message || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit User</h2>
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Admin">Admin</option>
            <option value="Student">Student</option>
            <option value="Researcher">Researcher</option>
            <option value="General">General</option>
          </select>
        </div>
        <div className="form-group">
          <label>Categories</label>
          <input
            name="categories"
            value={formData.categories.join(', ')}
            onChange={handleCategoriesChange}
            placeholder="Comma-separated"
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div className="modal-actions">
          <button className="save-btn" onClick={handleSubmit}>Save</button>
          <button className="cancel-btn" onClick={onClose}> Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
