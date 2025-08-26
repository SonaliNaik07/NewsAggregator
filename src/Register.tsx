import React, { useState } from 'react';
import CategorySelect from './components/CategorySelect';
import './Styles/Register.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    categories: [] as string[],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategories = (selected: string[]) => {
    setFormData({ ...formData, categories: selected });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.role !== 'Admin' && formData.categories.length === 0) {
      alert("Please select at least one news category.");
      return;
    }

    setLoading(true);

    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      if (formData.role !== 'Admin') {
        payload.categories = formData.categories;
      }

      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log('📥 Server response:', data);

      if (data.error) {
        alert(data.error);
      } else {
        alert('Registration successful!');
        window.location.href = '/login';
      }
    } catch (err) {
      console.error('❌ Registration error:', err);
      alert('Something went wrong during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Your Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="input-field"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="input-field"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="input-field"
          required
        >
          <option value="">Select Role</option>
          <option value="Student">Student</option>
          <option value="Researcher">Researcher</option>
          <option value="General">General</option>
          <option value="Admin">Admin</option>
        </select>

        {formData.role !== 'Admin' && (
          <CategorySelect selected={formData.categories} onSelect={handleCategories} />
        )}

        <button type="submit" className="register-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
