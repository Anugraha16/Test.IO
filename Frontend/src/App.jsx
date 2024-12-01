import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CodingChallenge from "./components/Code/CodingChallenge";
import Mcq from "./components/Mcq/Mcq";
import Home from "./components/Pages/Home"
import Blogs from "./components/Pages/Blogs"
import AboutUs from "./components/Pages/AboutUs"

function App() {
  return (
    <>
      <Navbar/>
      <div className="pt-20">
        {/* Adjust this value as needed */}
        <Routes>
          <Route path="/Home" element={<Home/>} />
          <Route path="/Blogs" element={<Blogs/>} />
          <Route path="/AboutUs" element={<AboutUs/>} />
          <Route path="/codeEditor" element={<CodingChallenge />} />
          <Route path="/mcq" element={<Mcq />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
