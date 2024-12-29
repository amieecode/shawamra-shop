import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import NavBar from "./Components/Home/NavBar";
import Hero from "./Components/Home/Hero";
import Quotes from "./Components/Home/Quotes";
import Specialties from "./Components/Home/Specialties";
import Recommended from "./Components/Home/Recommended";
import Testimonials from "./Components/Home/Testimonial";
import Footer from "./Components/Home/Footer";
import Contact from "./Components/Home/contact";

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
      <div className="overflow-x-hidden bg-black text-white">
        <NavBar />
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Quotes />
                <Specialties />
                <Recommended />
                <Testimonials />
              </>
            }
          />

          {/* Contact Page Route */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;