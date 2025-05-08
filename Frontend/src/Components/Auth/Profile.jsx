import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSignOutAlt, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('/api/auth/profile/');
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders/');
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setOrders([]);
      }
    };

    fetchProfile();
    fetchOrders();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Your Profile</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {user && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">User Info</h4>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Full Name:</strong> {user.first_name} {user.last_name}</p>
            </div>
            <div className="flex items-start justify-end">
              <button
                onClick={() => navigate('/profile-update')}
                className="bg-brand text-white px-4 py-2 rounded hover:bg-brand/80 flex items-center gap-2"
              >
                <FaEdit /> Edit Profile
              </button>
            </div>
          </div>
        )}

        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-4">Recent Orders</h4>
          {orders.length === 0 ? (
            <p className="text-gray-500">You have no orders yet.</p>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="border rounded p-4 bg-gray-50">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Created:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
              ))}
              <button
                onClick={() => navigate('/orders')}
                className="mt-4 text-brand hover:underline"
              >
                View All Orders
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
