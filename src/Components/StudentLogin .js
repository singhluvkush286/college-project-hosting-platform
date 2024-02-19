import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use navigate function to navigate programmatically
    navigate('/student-home');
    // You can add your login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  }

  const handleStudentLogin = () => {
    navigate('/student-register');
  }

  return (
    <div>
      <h1>Student Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <button type='submit'>Login</button> 
          
        </div>
      </form>
      <button onClick={handleStudentLogin}>Register</button>
    </div>
  );
}

export default StudentLogin;
