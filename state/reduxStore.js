import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

import persistedRootReducer from './persistConfig';

export const store = configureStore({
  reducer: persistedRootReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action with non-serializable payload
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);
