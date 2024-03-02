import React, { Component } from 'react';
import './Validate.css'; // Import CSS file for styling
import { firestore } from "../firebase";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, getDocs ,addDoc } from "firebase/firestore";

class Validate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationRequests: [],
      selectedRequest: null,
      pdfUrl: null,
      plagiarismResult: null // Changed state name to plagiarismResult
    };
  }

  async componentDidMount() {
    // Fetch validation requests from Firestore
    const requestCollection = collection(firestore, "pendingProjects");
    const querySnapshot = await getDocs(requestCollection);
    const validationRequests = [];
    querySnapshot.forEach((doc) => {
      validationRequests.push({ id: doc.id, ...doc.data() });
    });
    this.setState({ validationRequests });
  }

  handleSelectRequest = async (request) => {
    this.setState({ selectedRequest: request });
    // Fetch PDF file URL
    const pdfRef = ref(storage, `project/${request.fileId}`);
    try {
      const url = await getDownloadURL(pdfRef);
      this.setState({ pdfUrl: url });
    } catch (error) {
      console.error("Error fetching PDF:", error);
    }
  };

  handleValidate = async (request) => {
    try {
      // Simulate scanning the PDF content and suggesting a dummy result
      const plagiarismResult = this.scanPDFContent(request.file);
      this.setState({ plagiarismResult });
    } catch (error) {
      console.error('Error checking plagiarism:', error);
      // Handle error (e.g., display error message)
    }
  };

  handleUploadProject = async (request) => {
    try {
      // Upload the PDF file to Firebase Storage
      const fileRef = ref(storage, `finalproject/${request.fileId}`);
      await uploadBytes(fileRef, request.file);

      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(fileRef);

      // Store project details in Firestore
      const finalUploadCollection = collection(firestore, "finalUpload");
      await addDoc(finalUploadCollection, {
        ...request,
        fileRef: downloadURL // Store the download URL of the PDF file
      });

      console.log("Project uploaded successfully to 'finalUpload' collection");
      // Optionally, you can remove the project from the pendingProjects collection
    } catch (error) {
      console.error("Error uploading project:", error);
    }
  };

  scanPDFContent = (file) => {
    // Simulate scanning PDF content and suggesting a result
    // In a real-world scenario, you would use a proper plagiarism detection service
    // For demonstration purposes, let's assume a random plagiarism score and message
    const plagiarismScore = Math.random() * 100;
    let message;
    if (plagiarismScore < 30) {
      message = "No plagiarism detected.";
    } else if (plagiarismScore >= 30 && plagiarismScore < 70) {
      message = "Possible plagiarism detected.";
    } else {
      message = "High level of plagiarism detected.";
    }
    return {
      score: plagiarismScore,
      message: message
    };
  };

  render() {
    const { validationRequests, selectedRequest, pdfUrl, plagiarismResult } = this.state;

    return (
      <div className="project-validation-container">
        <h2>Project Validation Requests</h2>
        <div className="request-list">
          <ul>
            {validationRequests.map(request => (
              <li key={request.id} onClick={() => this.handleSelectRequest(request)}>
                {request.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="selected-request">
          <h3>Selected Request</h3>
          {selectedRequest ? (
            <div>
              <h4>{selectedRequest.title}</h4>
              <p>{selectedRequest.description}</p>
              {pdfUrl && <iframe src={pdfUrl} width="100%" height="500px" title="Project PDF" />}
              <button onClick={() => this.handleValidate(selectedRequest)}>Validate Project</button>
              <button onClick={() => this.handleUploadProject(selectedRequest)}>Upload Project</button>
            </div>
          ) : (
            <p>No request selected</p>
          )}
        </div>
        {plagiarismResult && ( // Render plagiarism result only if it exists
          <div className="plagiarism-result">
            <h3>Plagiarism Result</h3>
            <p>Plagiarism Score: {plagiarismResult.score.toFixed(2)}</p>
            <p>Message: {plagiarismResult.message}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Validate;

