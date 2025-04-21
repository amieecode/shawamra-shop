import React, { useEffect, useState } from 'react'
import { getCartItems } from '../api/cart';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = async() => {
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

  return (
    <div className='min-h-screen bg-black text-white p-6'>
      <h2 className='text-3xl font-bold mb-6'>Your Cart</h2> 
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className='space-y-4'>
            {cartItems.map((item) => (
                <li 
                    key={item.id}
                    className='bg-white text-black p-4 rounded-lg flex justify-between items-center'
                >
                  <div>
                    <p className='font-bold'>{item.product.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.product.price}</p>
                  </div>
                  <p className='font-semibold'>
                    Total: ${item.product.price * item.quantity}
                  </p>
                </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
