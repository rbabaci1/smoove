import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import persistedRootReducer from './persistConfig';

const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production';

export const store = configureStore({
  reducer: persistedRootReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action with non-serializable payload
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: !isProduction,
});

export const persistor = persistStore(store);
