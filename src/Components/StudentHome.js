import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from './6000x4000-px-abstract-wallpaper-HD-Aesthetic-Wallpaper-Mystical-Wallpaper-Texture-Backgrounds-2238988-wallhere.com.jpg'; // Import the image
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functionalities
import { firestore } from "../firebase"; // Import Firebase instance

const StudentHome = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectCollection = collection(firestore, 'finalUpload');
        const projectSnapshot = await getDocs(projectCollection);
        const projectList = projectSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectList);
      } catch (error) {
        console.error('Error fetching projects: ', error);
      }
    };

    fetchProjects();
  }, []);

  const handleAddProject = () => {
    navigate('/add-project');
  }

  const handleStudentProfile = () => {
    navigate('/student-profile');
  }

  const styles = {
    container: {
      position: 'relative',
    },
    backgroundImage: {
      position: 'fixed', // Fixed position to cover the entire viewport
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
      maxWidth: '800px',
      margin: '100px auto 20px', // Adjusted to provide space for the fixed header and make content clear
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjusted to make the content clearer
      borderRadius: '10px', // Adjusted for a nicer look
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)', // Added for a subtle shadow effect
    },
    header: {
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: '#993399',
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 2,
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
    },
    main: {
      marginTop: '100px', // Adjusted to provide space for the fixed header and background image
      marginBottom: '20px',
    },
    projectCard: {
      border: '1px solid #ccc',
      padding: '20px',
      marginBottom: '20px',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
    },
    projectName: {
      margin: '0 0 10px',
      color: '#007bff',
      textDecoration: 'none',
    },
    description: {
      margin: 0,
      color: '#333',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundImage}></div>
      <header style={styles.header}>
        <h1 style={styles.title}>Project Sharing Platform</h1>
        <div style={styles.buttons}>
          <button onClick={handleAddProject} style={styles.button}>Add Project</button>
          <button onClick={handleStudentProfile} style={styles.button}>Dashboard</button>
        </div>
      </header>
      <div style={styles.content}>
        {projects.map(project => (
          <div key={project.id} style={styles.projectCard}>
            <Link to={`/project/${project.id}`} style={styles.projectName}>
              <h3>{project.title}</h3>
            </Link>
            <p style={styles.description}>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentHome;


