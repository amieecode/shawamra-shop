import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import ProfileUpdate from "./Components/Auth/UpdateProfile"
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

const App = () => {
  useEffect (() => {
    AOS.init({
      duration: 700,
      offset:100,
      delay: 100,
      easing: 'ease-in'
    });
  }); 

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile-update" element={<ProfileUpdate />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
     
  )
}

export default App;