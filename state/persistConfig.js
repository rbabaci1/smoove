import { persistReducer, createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reduxSlices';

const excludePaymentMethodTransform = createTransform(
  (inboundState, key) => {
    if (key === 'order') {
      // Exclude the paymentMethod prop from the order state
      const { paymentMethod, ...restOrder } = inboundState;
      return restOrder;
    }
    return inboundState;
  },
  (outboundState, key) => outboundState
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['order', 'auth'],
  transforms: [excludePaymentMethodTransform],
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export default persistedRootReducer;
