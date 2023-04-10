import { Provider } from 'react-redux';

import { store } from '../reduxStore';
// import Layout from '../components/Layout';
import '../styles/globals.scss';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
