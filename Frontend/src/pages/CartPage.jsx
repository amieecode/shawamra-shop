import React, { useEffect, useState } from 'react';
import { getCartItems } from '../api/cart';
import { FaTrashAlt } from 'react-icons/fa'; // Import trash icon from react-icons

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    try {
      const data = await getCartItems();
      setCartItems(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.total_price), 0).toFixed(2);
  };

  const handleRemoveItem = (id) => {
    // Implement removal logic
    console.log('Remove item with id:', id);
  };

  const handleQuantityChange = (id, quantity) => {
    // Implement quantity update logic (e.g., call API to update quantity)
    console.log('Update quantity for item with id:', id, 'to', quantity);
  };

  const handleQuantityIncrease = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleQuantityDecrease = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedCart);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            {/* Cart Items List */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-gray-50 p-6 rounded-lg shadow-md flex flex-col sm:flex-row gap-6 items-center">
                  {/* Left Side - Image, Name, Description */}
                  <div className="flex items-center gap-6 sm:w-3/4">
                    <img
                      src={`http://127.0.0.1:8000${item.product.image}`}
                      alt={item.product.name}
                      className="w-28 h-28 object-cover rounded-md border shadow-sm"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-xl font-semibold text-gray-800">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">{item.product.description}</p>
                    </div>
                  </div>

                  {/* Right Side - Price */}
                  <div className="sm:w-1/4 text-right">
                    <p className="text-sm text-gray-600">Price: ${item.product.price}</p>
                    <p className="text-sm text-gray-600 font-bold">Total: ${item.total_price}</p>
                  </div>

                  {/* Bottom Section - Remove and Quantity Controls */}
                  <div className="w-full mt-4">
                    {/* Remove Button */}
                    <div className="flex justify-between items-center mb-4">
                      <button
                        className="text-red-500 hover:text-red-700 font-semibold text-sm flex items-center gap-2"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <FaTrashAlt /> Remove
                      </button>

                      {/* Quantity Controls */}
                      <div className="flex justify-between items-center w-32">
                        <button
                          onClick={() => handleQuantityDecrease(item.id)}
                          className="bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-400 transition duration-200"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                          className="w-16 text-center border rounded-md p-2 focus:ring-2 focus:ring-purple-500"
                          min="1"
                          max="99"
                        />
                        <button
                          onClick={() => handleQuantityIncrease(item.id)}
                          className="bg-gray-300 text-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-400 transition duration-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-12 bg-white p-8 rounded-lg shadow-lg max-w-md ml-auto">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Cart Summary</h3>
              <div className="flex justify-between mb-2">
                <span>Total Items:</span>
                <span>{cartItems.length}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total Price:</span>
                <span>${calculateTotal()}</span>
              </div>
              <button className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-200">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
