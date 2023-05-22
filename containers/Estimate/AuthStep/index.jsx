import { Login, NoAuthRender } from '@/components';

import styles from './styles.module.scss';

const AuthStep = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginSignUp}>
        <h3>Phone number</h3>
        <span className={styles.subTitle}>
          {`You'll be receiving updates about your move to this phone number.`}
        </span>

        <Login animate={false} />
      </div>
    </div>
  );
};

export default NoAuthRender(AuthStep);
