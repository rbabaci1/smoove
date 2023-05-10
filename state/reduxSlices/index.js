import { combineReducers } from '@reduxjs/toolkit';

import orderReducer from './orderSlice';
import authUserReducer from './authSlice';

const rootReducer = combineReducers({
  order: orderReducer,
  auth: authUserReducer,
});

export default rootReducer;
