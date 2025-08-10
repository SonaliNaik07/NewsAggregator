
import React from 'react';
import InputField from './components/InputField';
import './styles/index.css';
import './Register'

const Login: React.FC = () => {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="form-title">LOG IN</h2>
        <p className="tagline">Stay informed. Stay relevant.</p>

        <form className="login-form">
          <InputField />

          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              required
            />
            <i className="material-symbols-outlined">lock</i>
          </div>

          <a href="#" className="forgot-pass-link">Forgot Password?</a>
          <button className="login-button" type="button" onClick={() => {
            localStorage.setItem('user', JSON.stringify({
              id: 'demo123',
              role: 'admin',
              interests: ['technology', 'sports', 'health']
            }));
          }}>Sign in</button>
        </form>

        <p className="signup-text">
          First time here? <a href="./register">Create your account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
