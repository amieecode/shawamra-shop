import React, { useState } from 'react';
import { getProfile, loginUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { SiSaucelabs } from "react-icons/si";
import { FiArrowLeft } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); 
    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);

      // Fetch User profile after successful
      const userProfile = await getProfile();
      localStorage.setItem("user", JSON.stringify(userProfile));

      setError("");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='max-w-md w-full p-6 bg-white shadow rounded-lg relative'>
        
        {/* Back Arrow */}
        <button 
          onClick={() => navigate('/')} 
          className="absolute top-4 left-4 text-gray-600 hover:text-black text-xl"
          title="Go back to home"
        >
          <FiArrowLeft />
        </button>

        {/* Logo + Title */}
        <div className="flex flex-col items-center my-4">
          <div className="flex items-center gap-2 text-3xl font-bold text-brand">
            <SiSaucelabs />
          </div>
          <h2 className='mt-4 mb-2'>Welcome back to Shawamra</h2>
          <p className="text-gray-600 text-sm text-center mb-2">Type your e-mail and password to log in or create a Shawamra account.</p>
        </div>

        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className="block mb-1 font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
              required
            />
          </div>
          <div className='mb-6'>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-brand text-white py-2 rounded-md hover:bg-brand/70 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Don&apos;t have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
