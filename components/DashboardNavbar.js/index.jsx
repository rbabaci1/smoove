import { useRouter } from 'next/router';

import { auth } from '@/firebase/firebase.config';
import styles from './styles.module.scss';

const DashboardNavbar = ({ activeContainer, setActiveContainer }) => {
  const router = useRouter();

  const logOut = () => {
    auth.signOut();
    router.replace('/');
  };

  return (
    <div className={styles.navBarWrapper}>
      <nav>
        <span
          onClick={() => router.push('/')}
          className={activeContainer === 0 ? styles.activeItem : null}
        >
          Home
        </span>

        <span
          onClick={() => setActiveContainer(1)}
          className={activeContainer === 1 ? styles.activeItem : null}
        >
          My Moves
        </span>

        <span
          onClick={() => setActiveContainer(2)}
          className={activeContainer === 2 ? styles.activeItem : null}
        >
          My Account
        </span>

        <span
          onClick={logOut}
          className={activeContainer === 3 ? styles.activeItem : null}
        >
          Log Out
        </span>
      </nav>
    </div>
  );
};

export default DashboardNavbar;