import React, { useState } from 'react';
import './Styles/index.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // ✅ Role-based redirection
        if (data.user.role === 'Admin') {
          window.location.href = '/admin-dashboard';
        } else {
          window.location.href = '/dashboard';
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="form-title">LOG IN</h2>
        <p className="tagline">Stay informed. Stay relevant.</p>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="material-symbols-outlined">mail</i>
          </div>

          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="material-symbols-outlined">lock</i>
          </div>

          <a href="#" className="forgot-pass-link">Forgot Password?</a>
          <button className="login-button" type="button" onClick={handleLogin}>
            Sign in
          </button>
        </form>

        <p className="signup-text">
          First time here? <a href="/register">Create your account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
