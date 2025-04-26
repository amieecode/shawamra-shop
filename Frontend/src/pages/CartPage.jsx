import React, { useEffect, useState } from 'react';
import { getCartItems } from '../api/cart';
import { FaTrashAlt } from 'react-icons/fa';

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
    console.log('Remove item with id:', id);
  };

  const handleQuantityChange = (id, quantity) => {
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
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4">
                <div className="flex gap-6">
                  {/* Image and Product Info */}
                  <div className="flex items-start gap-6 w-full">
                    <img
                      src={`http://127.0.0.1:8000${item.product.image}`}
                      alt={item.product.name}
                      className="w-28 h-28 object-cover rounded-md border shadow-sm"
                    />
                    <div className="flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{item.product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.product.description}</p>
                      </div>
                      <div className="text-sm text-gray-700 mt-3">
                        <p>Price: ${item.product.price}</p>
                        <p className="font-semibold">Total: ${item.total_price}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 font-semibold text-sm flex items-center gap-2"
                  >
                    <FaTrashAlt /> Remove
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityDecrease(item.id)}
                      className="w-8 h-8 bg-brand text-white rounded-full hover:bg-brand/80"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="w-16 text-center border rounded-md p-1"
                      min="1"
                      max="99"
                    />
                    <button
                      onClick={() => handleQuantityIncrease(item.id)}
                      className="w-8 h-8 bg-brand text-white rounded-full font-bold hover:bg-brand/80"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

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
              <button className="mt-6 w-full bg-brand text-white py-2 rounded-lg hover:bg-purple-700 transition">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
