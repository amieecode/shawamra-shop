import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Profile from "./Components/Auth/Profile";
import ProfileUpdate from "./Components/Auth/UpdateProfile";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import OrderConfirmation from "./pages/OrderConfirmation";

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-update" element={<ProfileUpdate />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
      </Routes>
    </Router>
     
  )
}

export default App;