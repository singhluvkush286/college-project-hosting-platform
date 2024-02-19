import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  let navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate('/student-login');
  }

  const handleAdminLogin = () => {
    navigate('/admin-login');
  }

  return (
    <div>
      <h1>Welcome to Our Project Showcase Platform</h1>
      <button onClick={handleStudentLogin}>Student Login</button>
      <button onClick={handleAdminLogin}>Admin Login</button>
    </div>
  );
}

export default LandingPage;
