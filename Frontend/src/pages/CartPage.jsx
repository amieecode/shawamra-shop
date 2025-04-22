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
          cartItems.map((item) => (
            <div key={item.id} className='bg-white shadow-md rounded-lg p-4 mb-4 w-full max-w-md mx-auto'>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className='w-32 h-32 object-cover rounded mx-auto'
                />
                <h2 className='text-2xl font-semibold mt-2 text-center'>{item.product.name}</h2>
                <p className='text-center'>Quantity: {item.quantity}</p>
                <p className='text-center'>Price: ${item.product.price}</p>
                <p className='text-center font-bold'>Total: ${item.total_price}</p>
            </div>
        ))
      )}
    </div>
  );
};

export default CartPage;
