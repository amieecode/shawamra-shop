import React, { useState } from 'react';
import { loginUser } from '../../api/auth';
import  { useNavigate } from 'react-router-dom';

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
    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      setError("");
      navigate("/");
    } catch (err) {
        setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className='max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-10'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
      {error && <p className='text-red-500 text-center mb-4'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
            <label className="block mb-1 font-medium">Username</label>
            <input
                type="text"
                name="username"
                value={formData.username} 
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline focus:ring"
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
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
            Login
        </button>
      </form>
    </div>
  );
};

export default Login;
