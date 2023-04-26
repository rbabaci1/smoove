import { Login } from '@/components';
import styles from './styles.module.scss';

const FinalStep = () => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.loginSignUp}>
          <h3>Phone number</h3>
          <span>
            {`You'll be receiving updates about your move to this phone number.`}
          </span>

          <Login animate={false} />
        </div>
      </div>
    </div>
  );
};

export default FinalStep;
