import React, {useEffect} from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
      <h1 className="text-3xl font-bold underline">
        Shawarma shop 
      </h1>
    </div>
  )
}

export default App;