import React, { useEffect, useState } from 'react';
import { getCartItems } from '../api/cart';
import { FaTrashAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { clearCart } from '../Redux/cartSlice';
import api from '../axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Layout/Navbar';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const updateQuantityOnBackend = async (itemId, quantity) => {
    try {
      await api.patch(`/cart/update/${itemId}/`, { quantity });
    } catch (error) {
      console.error(`Failed to update quantity for item ${itemId}:`, error);
      toast.error('Failed to update quantity');
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await api.post("/orders/", {
        items: cartItems.map(item => ({
          product: item.product.id,
          quantity: item.quantity,
        })),
      });

      if (response.status === 201) {
        dispatch(clearCart());
        setCartItems([]);  // <-- Add this line to clear local state too
        toast.success("Order placed!");
        navigate(`/order-confirmation/${response.data.id}`);
      }

    } catch (error) {
      console.error(error);
      toast.error("Failed to place order");
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await api.delete(`/cart/remove/${id}/`);
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (id, value) => {
  const quantity = Math.max(1, parseInt(value) || 1);
  const previousItems = [...cartItems];

  const updatedItems = cartItems.map(item =>
    item.id === id ? { ...item, quantity } : item
  );
  setCartItems(updatedItems);

  try {
    await updateQuantityOnBackend(id, quantity);
  } catch (error) {
    toast.error("Failed to update quantity");
    setCartItems(previousItems);  // rollback UI on failure
  }
};


  const handleQuantityIncrease = (id) => {
    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedItems);
    const updatedItem = updatedItems.find(item => item.id === id);
    updateQuantityOnBackend(id, updatedItem.quantity);
  };

    const handleQuantityDecrease = async (id) => {
    const currentItem = cartItems.find(item => item.id === id);
    if (!currentItem || currentItem.quantity <= 1) return;  // Prevent decreasing below 1

    const updatedItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCartItems(updatedItems);

    try {
      await updateQuantityOnBackend(id, currentItem.quantity - 1);
    } catch (error) {
      toast.error('Failed to update quantity');
      setCartItems(cartItems); // rollback UI on failure
    }
  };



  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + parseFloat(item.total_price), 0)
      .toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 pt-24 flex flex-col lg:flex-row gap-8 justify-between">
        {/* Cart Card */}
        <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-2">
            Cart ({cartItems.length})
          </h2>
          <hr className="border-gray-300 mb-6 -mx-6" />

          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center py-10">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="border-b pb-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex gap-4 flex-1 min-w-0">
                      <img
                        src={`http://127.0.0.1:8000${item.product.image}`}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded border flex-shrink-0"
                      />
                      <div className="overflow-hidden">
                        <h3 className="text-lg font-semibold truncate">{item.product.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{item.product.description}</p>
                      </div>
                    </div>
                    <div className="text-right md:min-w-[150px] flex-shrink-0">
                      <p className="text-gray-700 text-sm">Price: ₦{item.product.price}</p>
                      <p className="text-brand text-sm font-semibold">Total: ₦{item.total_price}</p>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 text-sm flex items-center gap-1 hover:text-red-700"
                    >
                      <FaTrashAlt /> Remove
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityDecrease(item.id)}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        min="1"
                        className="w-12 text-center border rounded"
                      />
                      <button
                        onClick={() => handleQuantityIncrease(item.id)}
                        className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary Section */}
        {cartItems.length > 0 && (
          <div className="w-full lg:w-1/3 lg:sticky top-24 self-start">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="flex justify-between text-lg font-semibold mb-4">
                <span>Total:</span>
                <span>₦{calculateTotal()}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="w-full py-3 bg-brand text-white font-semibold rounded hover:bg-brand/90 text-lg"
              >
                Checkout – ₦{calculateTotal()}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
