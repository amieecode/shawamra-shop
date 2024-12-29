import React from 'react'
import Footer from '../Home/Footer';
import NavBar from '../Home/NavBar';
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const contact = () => {
  return (
    <>
      <NavBar />
      
      <div>
        {/*Text Section*/}
          <h2>Get in Touch!</h2> 
          <p>Make enquires, Ask anything</p> 

        {/*Icons Section*/} 
          <div>
            {/*Location*/}
              <FaLocationDot />
            {/*phone*/} 
              <FaPhoneVolume />
            {/*Email*/} 
              <MdEmail /> 
          </div>

        {/*Form Section */}    
      </div>
      <Footer />
    </>
  )
}

export default contact
