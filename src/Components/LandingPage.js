import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './luv.jpg'; // Import the image
import './LandingPage.css'; // Import CSS file for styling

const LandingPage = () => {
  let navigate = useNavigate();

  const handleStudentLogin = () => {
    navigate('/student-login');
  }

  const handleAdminLogin = () => {
    navigate('/admin-login');
  }

  const styles = {
    container: {
      backgroundImage: `url(${backgroundImage})`, // Set the background image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh', // Ensure the container covers the entire viewport height
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    title: {
      color: '#fff',
      marginBottom: '20px',
      textAlign: 'center',
    },
    buttonContainer: {
      display: 'flex',
      gap: '20px',
    },
    button: {
      padding: '10px 20px',
      borderRadius: '5px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Our Project Showcase Platform</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleStudentLogin}>Student Login</button>
        <button style={styles.button} onClick={handleAdminLogin}>Admin Login</button>
      </div>
    </div>
  );
}

export default LandingPage;
