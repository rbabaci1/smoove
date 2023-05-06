import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './reduxSlices/orderSlice';
import authUserReducer from './reduxSlices/authSlice';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    auth: authUserReducer,
  },
});
