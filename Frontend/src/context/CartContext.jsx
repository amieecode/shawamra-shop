import React, { createContext, useContext, useState } from 'react';
import { getCartItems,  } from '../api/cart';

export const createContext = createContext();

export const cartProvider = ({ children }) => {
    const [ cartItems, setCartItems] = useState([]);

const fetchCart = async () => {
    try {
        const data = await 
        setCartItems
    } catch (err){

    }

}
}
