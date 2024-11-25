import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
import './App.css';
import StaffHome from './components/Staff/StaffHome';
import Questions from './components/Staff/Questions';
import Performance from './components/Staff/Performance';
import StaffNavbar from './components/Staff/StaffNavbar';
import StudentDetails from './components/Staff/StudentDetails';

function App() {
  return (
    <Router> {/* Add Router here */}
      <StaffNavbar />
      <div className="pt-20">
        {/* Adjust this value as needed */}
        <Routes>
          <Route path="/Home" element={<StaffHome />} />
          <Route path="/Questions" element={<Questions />} />
          <Route path="/Performance" element={<Performance />} />
          <Route path="/StudentDetails" element={<StudentDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
