import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CodeTest from "./components/Code/CodeTest";
import Mcq from "./components/Code/Mcq";
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
          <Route path="/codeEditor" element={<CodeTest />} />
          <Route path="/mcq" element={<Mcq />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
