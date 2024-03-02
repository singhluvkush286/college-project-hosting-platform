import React from 'react';
import './AdminHome.css'; // Import CSS file for styling
import { Link, useNavigate } from 'react-router-dom';

export default function AdminHome() {

  const navigate = useNavigate();

  const handleValidateProject = () => {
    navigate('/admin-validate');
  }
  return (
    <div className='bodyAdmin'>
        <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <div className="section">
        <h2 className="section-title">Projects</h2>
        <div className="button-group">
          <button className="action-button" onClick={handleSeeAllProjects}>See All Projects</button>
          {/* <button className="action-button" onClick={handleProjectValidation}>Validate Projects</button> */}
          <button onClick={handleValidateProject} className="action-button">Validate Project</button>
        </div>
      </div>
      <div className="section">
        <h2 className="section-title">Project Suggestions</h2>
        <div className="button-group">
          <button className="action-button" onClick={handleSeeProjectSuggestions}>See Project Suggestions</button>
        </div>
      </div>
      <div className="section">
        <h2 className="section-title">Project Stats</h2>
        <div className="stats">
          <p>Total Projects: <span className="highlight">{getTotalProjects()}</span></p>
          <p>Validated Projects: <span className="highlight">{getValidatedProjects()}</span></p>
          <p>Pending Validation: <span className="highlight">{getPendingValidation()}</span></p>
        </div>
      </div>
    </div>

    </div>
    
  );

  function handleSeeAllProjects() {
    // Logic to navigate to a page showing all projects
  }

  function handleProjectValidation() {
    // Logic to navigate to a page for project validation
  }

  function handleSeeProjectSuggestions() {
    // Logic to navigate to a page showing project suggestions
  }

  function getTotalProjects() {
    // Logic to fetch total number of projects
    return 100; // Example value
  }

  function getValidatedProjects() {
    // Logic to fetch number of validated projects
    return 80; // Example value
  }

  function getPendingValidation() {
    // Logic to fetch number of projects pending validation
    return 20; // Example value
  }
}
