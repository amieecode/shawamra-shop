import { configureStore } from '@reduxjs/toolkit';
import CartReducer from './slices/CartSlice';

const store = configureStore({
  reducer: {
    cart: CartReducer,
  },
});
export default store;
