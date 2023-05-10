import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '@/state/reduxStore';
import { handleAuthStateChange } from '@/lib';
import '../styles/globals.scss';

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const unsubscribe = handleAuthStateChange(store.dispatch);
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default App;
