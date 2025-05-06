const cartSlice = createSlice({
    name: 'cart',
    initialState: {
      items: JSON.parse(localStorage.getItem("cartItems")) || [],
    },
    reducers: {
      addToCart: (state, action) => { /* logic */ },
      removeFromCart: (state, action) => { /* logic */ },
      clearCart: (state) => {
        state.items = [];
        localStorage.removeItem("cartItems");
      },
    },
  });
  
  export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
  export default cartSlice.reducer;
  