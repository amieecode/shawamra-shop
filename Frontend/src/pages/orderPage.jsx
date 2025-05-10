import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/orders/', {
          headers: { Authorization: `Token ${token}` },
        });
        setOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [navigate]);

  const toggleExpand = (id) => {
    setExpandedOrderId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h2>

        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded-xl text-center shadow-sm">
            <p className="text-gray-600 text-lg">🛍️ You haven’t placed any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const isOpen = expandedOrderId === order.id;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow border p-6 sm:p-8 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        Order #{order.id}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Placed on {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <span
                        className={`text-sm px-4 py-1 rounded-full font-medium ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.status}
                      </span>

                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="text-[#684df4] hover:underline text-sm font-medium flex items-center"
                      >
                        {isOpen ? 'Hide Details' : 'View Details'}
                        <svg
                          className={`w-4 h-4 ml-1 transform transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t pt-6">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Items</h4>
                        {order.items?.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm text-gray-600 mb-1"
                          >
                            <span>{item.product_name}</span>
                            <span className="font-medium text-gray-800">
                              {item.quantity} x ₦{item.price}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 text-sm text-gray-700">
                        <div>
                          <p className="text-gray-500">Shipping Address:</p>
                          <p className="font-medium">{order.shipping_address || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Payment Method:</p>
                          <p className="font-medium">{order.payment_method || 'Not specified'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Total:</p>
                          <p className="text-lg font-bold text-[#684df4]">₦{order.total}</p>
                        </div>
                        <div className="pt-2">
                          <button className="text-[#684df4] hover:underline text-sm font-medium">
                            Download Invoice
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
