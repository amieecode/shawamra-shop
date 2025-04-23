import React, { useEffect, useState } from 'react'
import { getCartItems } from '../api/cart';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = async() => {
        try {
            const data = await getCartItems();
            console.log("Cart API response:", data)
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
  
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Your Cart</h2>
  
          {cartItems.length === 0 ? (
            <p className="text-center text-lg text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <div className="grid gap-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex gap-6">
                    <img
                      src={`http://127.0.0.1:8000${item.product.image}`}
                      alt={item.product.name}
                      className="w-32 h-32 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{item.product.name}</h3>
                      <p className="text-gray-600">Price: ${item.product.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p className="font-semibold text-gray-800">Total: ${item.total_price}</p>
                    </div>
                    <button className="text-red-500 hover:text-red-700 font-bold">Remove</button>
                  </div>
                ))}
              </div>
  
              <div className="mt-10 bg-white p-6 rounded-lg shadow-md max-w-md ml-auto">
                <h3 className="text-xl font-semibold mb-4">Cart Summary</h3>
                <div className="flex justify-between mb-2">
                  <span>Total Items:</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Price:</span>
                  <span>${calculateTotal()}</span>
                </div>
                <button className="mt-6 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition">
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