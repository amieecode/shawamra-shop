import axios from "axios";
import api from "../axios";


export const getAllProducts = () => {
    return axios.get("http://127.0.0.1:8000/api/products/");
  };

// Get all cart items for the user
export const getCartItems = async () => {
    const response = await api.get("/cart/");
    return response.data;
  };


// Add product to Cart 
export const addToCart = async (productId, quantity = 1) => {
    const response = await api.post("/cart/add/", {
        product_id: productId, 
        quantity
    });
    return response.data;
};


// Update Cart Item
export const updateCartItem = async (id, quantity) => {
    const response = await api.put(`/cart/update/${id}/`, { quantity });
    return response.data;
};


// Remove Cart Item
export const removeFromCart = async (id) => {
  const response = await api.delete(`/cart/remove/${id}/`);
  return response.data;
};


// Clear entire cart
export const clearCart = async () => {
    const response = await api.delete("/cart/clear/");
    return response.data;
};