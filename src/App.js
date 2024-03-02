import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Switch
import LandingPage from './Components/LandingPage';
import StudentLogin from './Components/StudentLogin ';
import AdminLogin from './Components/AdminLogin';
import StudentHome from './Components/StudentHome';
import StudentRegister from './Components/StudentRegister';
import ProjectDetail from './Components/ProjectDetail';
import AddProject from './Components/AddProject';
import AdminRegister from './Components/AdminRegister';
import AdminHome from './Components/AdminHome';
import StudentDashboard from './Components/StudentDashboard';
import Validate from './Components/Validate';


// Import other components as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage/>} />
        
        <Route path="/student-login" element={<StudentLogin/>} />
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path="/student-home" element={<StudentHome/>} />
        <Route path="/student-register" element={<StudentRegister/>} />
        <Route path="/project/:projectId" element={<ProjectDetail />} /> 

        <Route path="/add-project" element={<AddProject/>} />
        <Route path='/student-profile' element={<StudentDashboard/>} />
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/admin-register' element={<AdminRegister/>}/>
        <Route path='/admin-home' element={<AdminHome/>}/>
        <Route path='/admin-validate' element={<Validate/>}/>

        
      </Routes>
    </Router>
  );
}

export default App;
