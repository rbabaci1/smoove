import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

const UserInfoStep = () => {
  const { uid, displayName, email, phoneNumber } = useSelector(
    state => state.auth.user
  );

  console.log({ uid, displayName, email, phoneNumber });

  return <div className={styles.container}>UserInfoStep</div>;
};

export default UserInfoStep;
