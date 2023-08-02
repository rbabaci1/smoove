import { useRouter } from 'next/router';
import { AiFillLock } from 'react-icons/ai';
import { BiLogOutCircle } from 'react-icons/bi';

import { auth } from '@/firebase/firebase.config';
import { UserInfoStep } from '@/containers/Estimate';
import { WithAuth } from '@/components';
import styles from './profile.module.scss';

const ProfileInfo = () => {
  const router = useRouter();

  const handleLogOut = () => {
    if (confirm('Are you sure you want to log out?')) {
      router.replace('/');
      auth.signOut();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navWrapper}>
        <nav>
          <section className={styles.left}>
            <span>
              <AiFillLock />
            </span>

            <h3>Profile info</h3>
          </section>

          <section className={styles.logOutBtn}>
            <BiLogOutCircle onClick={handleLogOut} />
          </section>
        </nav>
      </div>

      <UserInfoStep />
    </div>
  );
};

export default WithAuth(ProfileInfo);
