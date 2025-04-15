import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem('user'));

    const [formData, setFormData] = useState({
        username: storedUser?.username || '',
        first_name: storedUser?.first_name || '',
        last_name: storedUser?.last_name || '',
        email: storedUser?.email || '',
        password: '',
    });

    const [message, setMessage] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleChange = async (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleUpdate = async (e) => {
       e.preventDefault();
       try {
        console.log("Updating with:", formData)
        const updateUser = await updateProfile(formData);
        localStorage.setItem('user', JSON.stringify(updateUser));
        setMessage('Profile updated successfully');
       } catch (err) {
        console.error("Error updating profile:", err.response?.data || err.message);
        setMessage('Failed to update profile.\Please try again.');
       }
    };

  return (
    <div className='min-h-screen bg-[#fff7f1] flex flex-col items-center justify-center px-4'>
        <div className='bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-200'>
            <h1 className='text-2xl font-bold text-brand mb-4'>
                Hello, {storedUser?.first_name || storedUser?.username}!
            </h1>
            <p className='text-gray-600 mb-4'>
                Update your profile information below.
            </p>

            {message && (
               <div className='mb-4 text-center text-sm font-medium text-green-600'>
                {message}
               </div>
            )}

            <form onSubmit={handleUpdate} className='space-y-4'>
                <input 
                    type='hidden'
                    name='username'
                    value={formData.username}
                />

                <div>
                  <label className='block mb-1 text-sm font-semibold text-gray-700'>First Name</label>
                    <input
                        type='text'
                        name='first_name'
                        value={formData.first_name}
                        onChange={handleChange}
                        className='w-full p-2 border rounded-md'
                    />
                </div>

                <div>
                   <label className='block mb-1 text-sm font-semibold text-gray-700'>Last Name</label> 
                   <input 
                        type='text'
                        name='last_name'
                        value={formData.last_name}
                        onChange={handleChange}
                        className='w-full p-2 border rounded-md'
                   />
                </div>

                <div>
                   <label className='block mb-1 text-sm font-semibold text-gray-700'>Email</label> 
                   <input 
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full p-2 border rounded-md'
                   />
                </div>

                <div>
                   <label className='block mb-1 text-sm font-semibold text-gray-700'>New Password</label> 
                   <input 
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Leave blank to keep current password'
                        className='w-full p-2 border rounded-md'
                   />
                </div>

                <button
                    type='submit'
                    className='w-full bg-brand text-white py-2 rounded-xl hover:bg-brand/80 transition'
                >
                    Update Profile
                </button>
            </form>

            {/*Logout Section*/}
            <button
                onClick={handleLogout}
                className='mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl transition duration-200'
            >
                Logout
            </button>
        </div>
    </div>

    )
}

export default UpdateProfile;
