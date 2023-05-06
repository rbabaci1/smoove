import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { auth } from '@/firebase/firebase.config';
import { WithAuth } from '@/components';
import styles from './styles.module.scss';

const Dashboard = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h2>Welcome to Dashboard</h2>

      <button
        onClick={() => {
          router.push('/');
        }}
      >
        Home
      </button>

      <div style={{ margin: '1rem 0' }} />

      <button
        onClick={() => {
          auth.signOut();
          router.replace('/login');
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default WithAuth(Dashboard);
