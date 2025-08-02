import React, { useState } from 'react';
import CategorySelect from './components/CategorySelect';
import './Register.css';

const Register: React.FC = () => {
  // 🔐 Form state for user input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    categories: [] as string[],
  });

  // 🛠️ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🗞️ Handle category selection (max 1)
const handleCategories = (selected: string[]) => {
  if (selected.length <= 1) {
    setFormData({ ...formData, categories: selected });
  }
};


  // 💾 Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Confirm passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // ✅ Must select 1–2 categories
    if (formData.categories.length === 0) {
      alert("Please select at least one news category.");
      return;
    }

    console.log("Registered user:", formData);
    // Future: Send formData to backend + notifications setup
  };

  return (
    <div className="register-wrapper">
      {/* 📋 Registration Form */}
      <form className="register-card" onSubmit={handleSubmit}>
        <h2 className="form-title">Create Your PressDesk Account</h2>

        {/* 👤 Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="input-field"
          required
        />

        {/* 📧 Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
          required
        />

        {/* 🔐 Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
          required
        />

        {/* 🔁 Confirm Password */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="input-field"
          required
        />

        {/* 🎭 Role Selection */}
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

        {/* 🗞️ Category Selector (only one allowed) */}
        <CategorySelect selected={formData.categories} onSelect={handleCategories} />

        {/* 🖱️ Submit Button */}
        <button type="submit" className="register-button">Register</button>

        {/* 🔗 Link to Login */}
        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
