import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css' ;

const RegisterPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee'); // Default role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }), 
      });
      const data = await response.json();
      if (response.ok) {
        
        
        if (data.redirectUrl) {
          console.log(data.redirectUrl);
          navigate(data.redirectUrl);
          console.log("navigated")
        } else {
          navigate('/login');
       } }
      else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className='register-page'>
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="email"
          className="register-input"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="register-input"
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="register-select"
          required
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="register-button">Register</button>
      </form>
      <p>Aldready Registered? <a href="./login">Login</a></p>
    </div>
    </div>
  );
};

export default RegisterPage;
