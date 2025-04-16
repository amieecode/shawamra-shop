import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import ProfileUpdate from "./Components/Auth/UpdateProfile";


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
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
     
  )
}

export default App;