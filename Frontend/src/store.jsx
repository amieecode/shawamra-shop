import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Redux/authSlice'; // this is where you'll manage user info

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
