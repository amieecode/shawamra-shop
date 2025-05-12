import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSignOutAlt, FaEdit, FaHome } from 'react-icons/fa';
import Navbar from '../../Components/Layout/NavBar'; 

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/auth/profile/', {
          headers: { Authorization: `Token ${token}` },
        });
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/orders/', {
          headers: { Authorization: `Token ${token}` },
        });
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setOrders([]);
      }
    };

    fetchProfile();
    fetchOrders();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <Navbar /> {/* ✅ Navbar included here */}
      <div className="min-h-screen bg-[#f4f7fc] overflow-x-hidden px-4 mt-20 sm:px-6 py-6">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-5 sm:p-8 w-full">
          {/* Header with Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 w-full">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user ? `Welcome, ${user.username}!` : 'Your Profile'}
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => navigate('/')}
                className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-300 flex items-center justify-center gap-2 text-sm"
              >
                <FaHome /> Back to Home
              </button>
              <button
                onClick={handleLogout}
                className="bg-brand text-white px-6 py-3 rounded-full hover:bg-brand/90 flex items-center justify-center gap-2 text-sm"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>

          {/* Profile section */}
          {user && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <div className="bg-gray-50 border rounded-xl p-6 shadow-sm w-full">
                <h4 className="text-lg font-semibold text-gray-700 mb-4">User Info</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Full Name:</strong> {user.first_name} {user.last_name}</p>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end items-start w-full">
                <button
                  onClick={() => navigate('/profile-update')}
                  className="bg-brand text-white px-6 py-3 rounded-full hover:bg-brand/90 flex items-center justify-center gap-2 text-sm"
                >
                  <FaEdit /> Edit Profile
                </button>
              </div>
            </div>
          )}

          {/* Orders Section */}
          <div className="w-full">
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h4>
            {orders.length === 0 ? (
              <p className="text-gray-500">You have no orders yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="bg-gray-50 border rounded-lg p-4 shadow-sm w-full overflow-hidden">
                    <p className="text-sm text-gray-700"><strong>Order ID:</strong> {order.id}</p>
                    <p className="text-sm text-gray-700"><strong>Status:</strong> {order.status}</p>
                    <p className="text-sm text-gray-700"><strong>Created:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
                <div className="pt-4">
                  <button
                    onClick={() => navigate('/orders')}
                    className="text-brand hover:underline text-sm"
                  >
                    View All Orders
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
