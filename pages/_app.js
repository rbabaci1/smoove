import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { auth } from '@/firebase/firebase.config';
import { store, persistor } from '@/state/reduxStore';
import { setUser } from '@/state/reduxSlices/authSlice';
import '../styles/globals.scss';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const App = ({ Component, pageProps }) => {
  const { dispatch } = store;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        dispatch(setUser(null));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Elements stripe={stripePromise}>
          <Component {...pageProps} />
        </Elements>
      </PersistGate>
    </Provider>
  );
};

export default App;
