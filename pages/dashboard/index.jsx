import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import { auth } from '@/firebase/firebase.config';
import { setUser } from '@/reduxSlices/authSlice';
import { Sidebar, WithAuth } from '@/components';
import styles from './styles.module.scss';

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logOut = () => {
    auth.signOut();
    dispatch(setUser(null));
    router.replace('/login');
  };

  return (
    <div className={styles.container}>
      <Sidebar />

      <h2>Welcome to Dashboard</h2>

      <button
        onClick={() => {
          router.push('/');
        }}
      >
        Home
      </button>

      <div style={{ margin: '1rem 0' }} />

      <button onClick={logOut}>Sign out</button>
    </div>
  );
};

export default WithAuth(Dashboard);
