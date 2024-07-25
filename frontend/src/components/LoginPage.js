import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './LoginPage.css'

const LoginPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee'); // Default role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Send role with login request
      });
      const data = await response.json();
      if (response.ok) {
        // // Navigate based on user role after login
        // switch (data.user.role) {
        //   case 'superadmin':
        //   case 'admin':
        //     navigate('/admin');
        //     break;
        //   case 'manager':
        //     navigate('/manager');
        //     break;
        //   case 'employee':
        //     navigate('/employee');
        //     break;
        //   default:
        //     navigate('/');
        //     break;

        // Store token in local storage
        localStorage.setItem('token', data.token);

        // Navigate based on redirectUrl from the response
        navigate(data.redirectUrl);
        
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="email"
            className="login-input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="login-select"
            required
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>Not Registered? <a href='/register'>Register</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
