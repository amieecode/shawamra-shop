import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleProfileUpdate = () => {
        navigate("/profile-update");
    };

    return (
        <div className='min-h-screen bg-[#fff7f1] flex flex-col items-center justify-center px-4'>
            <div className='bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-gray-200'>
                <h1 className='text-2xl md:text-3xl font-bold text-brand mb-4'>
                    Welcome, {user?.first_name || user?.username}!
                </h1>
                <p className='text-gray-600 mb-4'>Email: {user?.email}</p>

                <div className='mt-6'>
                    <p className='text-lg text-gray-700'>You're now logged in</p>
                    <p className='text-sm text-gray-500 mt-1'>
                        Ready to order some juicy shawarma?
                    </p>
                </div>
                
                {/* Update Profile Button */}
                <button
                    onClick={handleProfileUpdate}
                    className='mt-6 w-full bg-brand hover:bg-brand/80 text-white py-2 px-4 rounded-xl transition duration-200'
                >
                    Update Profile
                </button>


                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className='mt-8 w-full bg-brand hover:bg-brand/80 text-white py-2 px-4 rounded-xl transition duration-200'
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Dashboard;
