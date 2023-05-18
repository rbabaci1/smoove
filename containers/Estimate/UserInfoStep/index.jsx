import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { formatPhoneNumber } from '@/lib';
import styles from './styles.module.scss';

const UserInfoStep = () => {
  const { user } = useSelector(state => state.auth);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setUserInfo({ ...userInfo, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { firstName, lastName, email } = userInfo;

    if (firstName.length < 3) setErrors({ ...errors, firstName: true });
    if (lastName.length < 3) setErrors({ ...errors, lastName: true });

    // TODO: Send data to firebase
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <section className={styles.phoneNumber}>
          <h3>Phone number</h3>
          <input
            type='text'
            value={formatPhoneNumber(user?.phoneNumber)}
            className={errors.phoneNumber ? styles.error : ''}
            readOnly
          />
        </section>

        <section className={styles.name}>
          <input
            type='text'
            name='firstName'
            placeholder='First name'
            className={errors.firstName ? styles.error : ''}
            value={userInfo.firstName}
            onChange={handleChange}
            required
          />

          <input
            type='text'
            name='lastName'
            placeholder='Last name'
            className={errors.lastName ? styles.error : ''}
            value={userInfo.lastName}
            onChange={handleChange}
            required
          />
        </section>

        <section className={styles.email}>
          <input
            type='email'
            name='email'
            placeholder='Email address'
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </section>

        <motion.button
          type='submit'
          whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        >
          Continue
        </motion.button>
      </form>
    </div>
  );
};

export default UserInfoStep;
