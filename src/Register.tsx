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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategories = (selected: string[]) => {
    if (selected.length <= 1) {
      setFormData({ ...formData, categories: selected });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.categories.length === 0) {
      alert("Please select at least one news category.");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          categories: formData.categories,
        }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        alert('Registration successful!');
        window.location.href = '/login';
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Something went wrong during registration.');
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Your PressDesk Account</h2>

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
        </select>

        <CategorySelect selected={formData.categories} onSelect={handleCategories} />

        <button type="submit" className="register-button">Register</button>

        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
