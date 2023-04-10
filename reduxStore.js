import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './reduxSlices/orderSlice';

export const store = configureStore({
  reducer: {
    order: orderReducer,
  },
});
