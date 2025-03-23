import { createSlice } from "@reduxjs/toolkit";

// Load cart from the local storage
const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
    name : "cart",
    initialState: {
        cart: storedCart, // initial state for local storage
    },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items)); // update local storage
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload.id);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items=[];
            localStorage.removeItem("cart");
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;