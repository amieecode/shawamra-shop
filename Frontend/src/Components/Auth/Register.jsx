import React, { useState } from 'react';
import { registerUser } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { SiSaucelabs } from "react-icons/si";
import { FiArrowLeft } from "react-icons/fi";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            const token = data.token 

            if (token) {
                localStorage.setItem("token", token); 
                navigate("/login");
            } else {
                setError("Failed to retrieve token. Try again.");
            }
        } catch (err) {
          console.error(err.response?.data || err.message);
          setError(err.response?.data?.error || "Something went wrong. Please check your inputs.");
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
            <h2 className='mt-4 mb-2'>Welcome to Shawamra</h2>
            <p className="text-gray-600 text-sm">Create an account</p>
          </div>

          {error && <p className='text-red-500 text-center mb-3'>{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label className='block mb-1 font-medium'>Username</label>
                <input 
                    type="text" 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
                    required
                />
            </div>
            <div className='mb-4'>
                <label className='block mb-1 font-medium'>Email</label>
                <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring"
                    required
                />
            </div>
            <div className='mb-4'>
                <label className='block mb-1 font-medium'>Password</label>
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
              Register  
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
          </p>
        </div>
      </div>
    )
}

export default Register;
