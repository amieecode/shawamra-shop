import React, { useEffect, useState } from 'react';
import { getCartItems } from '../api/cart';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { clearCart } from '../Redux/cartSlice'; // import the action for clearing the cart
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for page navigation
import { removeFromCart } from '../api/cart';  // Make sure the path is correct

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate function

  const fetchCart = async () => {
    try {
      const data = await getCartItems();
      console.log("Cart items:", data);
      setCartItems(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post("/api/orders/", {
        items: cartItems.map(item => ({
          product: item.id,
          quantity: item.quantity,
        })),
      });

      if (response.status === 201) {
        dispatch(clearCart()); // Clear Redux state
        toast.success("Order placed!");
        navigate(`/order-confirmation/${response.data.id}`); // Navigate to the orders page after successful order placement
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`/api/cart/remove/${id}/`);
      setCartItems(cartItems.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error removing item:", error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + parseFloat(item.total_price), 0).toFixed(2);
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
              <button
                onClick={handlePlaceOrder}
                className="mt-6 w-full bg-brand text-white py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
