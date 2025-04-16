import React from 'react';
import NavBar from "../Components/Layout/NavBar";
import Specialties from "../Components/Layout/Specialties";
import Footer from "../Components/Layout/Footer";

const Menu = () => {
  return (
    <div className="overflow-x-hidden bg-black text-white">
        <NavBar />
        <div className="mt-28"> {/* Adjust the value as per your preference */}
          <Specialties />
        </div>
        <Footer />
    </div>
  )
}

export default Menu;
