// AdminLogin.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Import the CSS file

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use navigate function to navigate programmatically
    navigate('/admin-home');
    // You can add your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  }

  const handleAdminLogin = () => {
    navigate('/admin-register');
  }

  return (
    <div className="container">
      <div className="backgroundImage"></div>
      <div className="content">
        <h1 className="heading">Admin Login Page</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label htmlFor="email" className="label">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
          </div>
          <div className="formGroup">
            <label htmlFor="password" className="label">Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" required />
          </div>
          <div className="formGroup">
            <button type='submit' className="button">Login</button> 
          </div>
        </form>
        <button onClick={handleAdminLogin} className="registerButton">Register</button>
      </div>
    </div>
  );
}

export default AdminLogin;
