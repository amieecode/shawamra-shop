import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NavBar from "./Components/Layout/NavBar";
import Hero from "./Components/Layout/Hero";
import Quotes from "./Components/Layout/Quotes";
import Specialties from "./Components/Layout/Specialties";
import Recommended from "./Components/Layout/Recommended";
import Testimonials from "./Components/Layout/Testimonial";
import Footer from "./Components/Layout/Footer";

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
     <div className="overflow-x-hidden bg-black text-white">
        <NavBar />
        <Hero />
        <Quotes />
        <Specialties />
        <Recommended />
        <Testimonials />
        <Footer />
      </div>
  )
}

export default App;