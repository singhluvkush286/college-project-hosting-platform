import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './studentBackground.jpeg'; // Import the image
import { collection, getDocs, where, query } from "firebase/firestore"; // Import Firestore functionalities
import { firestore } from "../firebase"; // Import Firebase instance

const StudentLogin = () => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Query Firestore to find user with matching registration number and password
    const usersCollection = collection(firestore, "students");
    const q = query(usersCollection, where("registrationNumber", "==", registrationNumber), where("password", "==", password));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // User found, navigate to student home page
      navigate('/student-home');
    } else {
      // User not found or invalid credentials, show error message
      alert("Invalid registration number or password");
    }
  }

  const handleStudentRegister = () => {
    navigate('/student-register');
  }

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      position: 'relative',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      zIndex: -1,
    },
    content: {
      textAlign: 'center',
      width: '300px',
      marginTop: '50px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      borderRadius: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      zIndex: 1,
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '20px',
    },
    form: {
      marginBottom: '20px',
    },
    formGroup: {
      marginBottom: '10px',
      textAlign: 'left', // Adjusted text alignment to left
    },
    label: {
      fontSize: '1rem',
      marginBottom: '5px',
    },
    input: {
      width: '100%', // Adjusted input width to 100%
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '1rem',
      outline: 'none',
    },
    button: {
      width: '100%', // Adjusted button width to 100%
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
    },
    registerButton: {
      width: '100%', // Adjusted button width to 100%
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundImage}></div>
      <div style={styles.content}>
        <h1 style={styles.heading}>Student Login Page</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="registrationNumber" style={styles.label}>Registration Number:</label>
            <input type="text" id="registrationNumber" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} style={styles.input} required />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
          </div>
          <div style={styles.formGroup}>
            <button type='submit' style={styles.button}>Login</button>
          </div>
        </form>
        <button onClick={handleStudentRegister} style={styles.registerButton}>Register</button>
      </div>
    </div>
  );
}

export default StudentLogin;

