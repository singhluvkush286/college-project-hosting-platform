import React, { useState } from 'react';
import './AddProject.css'; // Import your CSS file for styling
import { firestore } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const AddProject = () => {
  const [projectDetails, setProjectDetails] = useState({
    title: '',
    description: '',
    skills: '',
    contributions: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload PDF file to Firebase Storage
    const file = projectDetails.file;
    const fileId = v4(); // Generate a unique ID for the file
    const fileRef = ref(storage, `project/${fileId}`);
    await uploadBytes(fileRef, file);

    // Store project details including file ID in Firestore
    const pendingProjectsCollection = collection(firestore, "pendingProjects");
    const data = {
      title: projectDetails.title,
      description: projectDetails.description,
      skills: projectDetails.skills,
      contributions: projectDetails.contributions,
      fileId: fileId,
    };

    try {
      await addDoc(pendingProjectsCollection, data);
      console.log("Project added successfully");
      alert("Project added successfully. Waiting for admin validation.");
    } catch (error) {
      console.error("Error adding project: ", error);
    }

    // Clear form fields after submission
    setProjectDetails({
      title: "",
      description: "",
      skills: "",
      contributions: "",
      file: null,
    });
  };

  return (
    <div>
      <h2 className="header">Upload Your Project</h2>
      <div className="container">
      {/* <h2 className="header">Upload Your Project</h2> */}
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={projectDetails.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Project Description</label>
          <textarea
            id="description"
            name="description"
            value={projectDetails.description}
            onChange={handleChange}
            rows="4"
            required
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills Used</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={projectDetails.skills}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="contributions">Source</label>
          <input
            type="text"
            id="contributions"
            name="contributions"
            value={projectDetails.contributions}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Project File</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(event) => setProjectDetails({...projectDetails, file: event.target.files[0]})}
            required
            className="form-control-file"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit Project</button>
      </form>
    </div>
    </div>
    
  );
};

export default AddProject;
