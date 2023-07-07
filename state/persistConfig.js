import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reduxSlices';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['order', 'auth'],
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export default persistedRootReducer;
