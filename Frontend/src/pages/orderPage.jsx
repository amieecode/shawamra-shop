import React from 'react';

const OrderPage = ({ orderDetails }) => {
  const { orderItems, totalPrice, totalItems } = orderDetails;

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-10">Order Summary</h1>

        {/* Order Details Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Order #12345</h2>

          <div className="space-y-6">
            {/* Items List */}
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700">{item.productName}</h3>
                      <p className="text-sm text-gray-500">{item.productDescription}</p>
                    </div>
                  </div>
                  <div className="text-gray-700">
                    <p>Qty: {item.quantity}</p>
                    <p>${item.totalPrice}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Total Items</span>
                <span className="font-semibold text-gray-800">{totalItems}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Total Price</span>
                <span className="font-semibold text-gray-800">${totalPrice}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => alert('Back to Cart')}
                className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                Back to Cart
              </button>
              <button
                onClick={() => alert('Proceeding to Checkout')}
                className="px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-dark transition"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
