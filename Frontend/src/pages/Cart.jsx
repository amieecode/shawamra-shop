import React, { useEffect, useState } from 'react';
import { addToCart,getCartItems, removeFromCart, updateCartItem, clearCart } from '../api/cart';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCart = async () => {
        const items = await getCartItems();
        setCartItems(items);
    };
    
    useEffect(() => {
        fetchCart();
    }, []);

    const handleAddToCart = async () => {
        try {
            await addToCart(product.id, quantity); // quantity = 1 or user-selected
            toast.success("Item added to cart!");
        } catch (error) {
            toast.error("Failed to add to cart");
            console.error(error);
        }
    };

    const handleRemove = async (id) => {
        await removeFromCart(id);
        fetchCart();
    };

    const handleQuantityChange = async (id, quantity) => {
        await updateCartItem(id, quantity);
        fetchCart();
    };

  return (
    <div className='p-4'>
        <h2 className='text-2xl mb-4'>Your Cart</h2>
        {cartItems.map(items => (
            <div key={items.id} className='mb-2 flex justify-between items-center'>
                <span>{items.product.name}</span>
                <input
                    type='number'
                    value={items.quantity}
                    onChange={(e) => handleQuantityChange(items.id, parseInt(e.target.value) || 1)}

                    className='w-16 border'
                />
                <button onClick={() => handleRemove(items.id)} className='text-red-500'>Remove</button>
            </div>
        ))}

        <button onClick={clearCart} className='mt-4 bg-red-500 text-white px-4 py-2 rounded'>
            Clear cart
        </button>
    </div>
  );
};

export default Cart;
