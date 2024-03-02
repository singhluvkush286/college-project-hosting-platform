import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Import Firebase Firestore functionalities
import { firestore } from '../firebase'; // Import Firebase instance

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user document from Firestore based on registration number
        const userCollectionRef = collection(firestore, 'students');
        const userQuery = query(userCollectionRef, where('registrationNumber', '==', "2101721033109")); // Replace 'user_registration_number_here' with the actual registration number
        const userQuerySnapshot = await getDocs(userQuery);
        
        if (!userQuerySnapshot.empty) {
          // Set user information state if the document exists
          userQuerySnapshot.forEach(doc => {
            setUserInfo(doc.data());
          });
        } else {
          console.log('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleAddProject = () => {
    navigate('/add-project');
  }

  const handleStudentHome = () => {
    navigate('/student-home');
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Student Dashboard</h1>
        <div style={styles.buttons}>
          <button onClick={handleAddProject} style={{ ...styles.button, ...styles.buttonHover }}>Add Project</button>
          <button onClick={handleStudentHome} style={{ ...styles.button, ...styles.buttonHover }}>Home</button>
        </div>
      </header>

      <div style={styles.main}>
        {userInfo && (
          <div style={{ ...styles.userInfo, ...styles.userInfoHover }}>
          <h2 style={styles.heading}>Welcome, {userInfo.name}!</h2>
          <p style={styles.info}><strong>Email Address:</strong> {userInfo.email}</p>
          <p style={styles.info}><strong>Department:</strong> {userInfo.department}</p>
          <p style={styles.info}><strong>Registration Number:</strong> {userInfo.registrationNumber}</p>
          <p style={styles.info}><strong>Mobile Number:</strong> {userInfo.mobileNumber}</p>
          <p style={styles.info}><strong>Contributions in Projects:</strong> -----</p>
        </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#008B8B', // Dark background color
    minHeight: '100vh',
  },
  header: {
    backgroundColor: '#8B008B',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: 0,
    color: '#fff',
  },
  buttons: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#fff',
    color: '#007bff',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#f0f0f0',
  },
  main: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
  },
  userInfo: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
  },
  userInfoHover: {
    transform: 'scale(1.02)',
  },
  heading: {
    marginBottom: '15px',
    color: '#007bff',
    transition: 'color 0.3s ease',
    fontSize: '20px',
  },
  info: {
    marginBottom: '10px',
    color: '#333',
    transition: 'color 0.3s ease',
    fontSize: '16px',
    fontFamily:"Arial, sans-serif",
  },
};

export default StudentDashboard;
