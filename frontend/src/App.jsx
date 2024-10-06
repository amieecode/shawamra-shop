import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NavBar from "./Components/Home/NavBar";
import Hero from "./Components/Home/Hero";
import Quotes from "./Components/Home/Quotes";
//import Specialties from "./Components/Home/Specialties";

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
    </div>
  )
}

export default App;