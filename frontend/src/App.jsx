import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import NavBar from "./Components/NavBar";
import Hero from "./Components/Hero";

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
    <div>
      <NavBar />
      <Hero />
    </div>
  )
}

export default App;