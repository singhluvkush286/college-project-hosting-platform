import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Switch
import LandingPage from './Components/LandingPage';
import StudentLogin from './Components/StudentLogin ';
import AdminLogin from './Components/AdminLogin';
import StudentHome from './Components/StudentHome';
import StudentRegister from './Components/StudentRegister';


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
        
      </Routes>
    </Router>
  );
}

export default App;
