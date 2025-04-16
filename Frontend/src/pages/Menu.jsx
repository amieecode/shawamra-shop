import React from 'react';
import NavBar from "../Components/Layout/NavBar";
import Specialties from "../Components/Layout/Specialties";
import Footer from "../Components/Layout/Footer";

const Menu = () => {
  return (
    <div className="overflow-x-hidden bg-black text-white">
        <NavBar />
        {""}
        <Specialties />
        <Footer />
    </div>
  )
}

export default Menu;
