import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/api/orders/${orderId}/`);
      setOrder(response.data);
    } catch (error) {
      console.error("Failed to fetch order:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div className="text-center py-12 text-xl text-gray-600">Loading order...</div>;
  }

  if (!order) {
    return <div className="text-center py-12 text-red-500">Order not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-brand mb-4 text-center">Thank You for Your Order!</h1>
        <p className="text-center text-gray-700 mb-8">Your order <strong>#{order.id}</strong> has been placed successfully.</p>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Order Summary</h2>
          <ul className="divide-y">
            {order.items.map((item) => (
              <li key={item.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <span className="font-semibold">${item.total_price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-4 flex justify-between font-bold text-lg text-gray-800">
          <span>Total:</span>
          <span>${order.total_price}</span>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-block bg-brand hover:bg-brand/90 text-white py-2 px-6 rounded-lg text-sm font-semibold transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
