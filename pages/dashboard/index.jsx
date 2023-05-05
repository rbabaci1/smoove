import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/firebase/firebase.config';
import styles from './styles.module.scss';

const Dashboard = () => {
  const router = useRouter();
  // const [user, loading] = useAuthState(auth);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, user => {
  //     if (!user) {
  //       router.replace('/login');
  //     }
  //   });

  //   return unsubscribe;
  // }, [router]);

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
          router.push('/login');
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default Dashboard;
