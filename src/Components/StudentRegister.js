import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import backgroundImage from './studentBackground.jpeg'; // Import the image

const StudentRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate(); // useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      // Add the registration data to the Firestore collection
      const registrationCollection = collection(firestore, "students");
      await addDoc(registrationCollection, {
        name,
        email,
        password,
        department,
        registrationNumber,
        mobileNumber,
      });
      console.log("Registration data stored in Firestore");
      // Show alert message
      alert("Registration completed. You will be redirected to the login page.");
      // Navigate to the student login page
      navigate('/student-login');
    } catch (error) {
      console.error("Error storing registration data:", error);
      // Handle error (e.g., display error message)
    }
  }

  const handleStudentLogin = () => {
    navigate('/student-login');
  }

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh', // Adjusted to occupy half of the viewport height
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
    heading: {
      marginBottom: '20px',
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#333',
    },
    form: {
      width: '300px',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      marginBottom: '5px',
      color: '#333',
      fontWeight: 'bold',
    },
    input: {
      width: '95%',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      width: '100%',
      padding: '10px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
    },
    loginButton: {
      marginTop: '10px',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#28a745',
      color: '#fff',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundImage}></div>
      <h1 style={styles.heading}>Student Register Page</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>Confirm Password:</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="department" style={styles.label}>Department:</label>
          <input type="text" id="department" value={department} onChange={(e) => setDepartment(e.target.value)} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="registrationNumber" style={styles.label}>Registration Number:</label>
          <input type="text" id="registrationNumber" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="mobileNumber" style={styles.label}>Mobile Number:</label>
          <input type="tel" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} style={styles.input} required />
        </div>
        <div style={styles.formGroup}>
          <button type='submit' style={styles.button}>Register</button>
        </div>
      </form>
      <button onClick={handleStudentLogin} style={styles.loginButton}>Login</button>
    </div>
  );
}

export default StudentRegister;
