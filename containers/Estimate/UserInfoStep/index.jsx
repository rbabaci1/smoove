import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { updateProfile, updateEmail } from 'firebase/auth';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { auth } from '@/firebase/firebase.config';
import { formatPhoneNumber } from '@/lib';
import styles from './styles.module.scss';
import { setUser } from '@/state/reduxSlices/authSlice';

const UserInfoStep = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    saving: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.displayName) {
        const [firstName, lastName] = user.displayName.split(' ');

        setUserInfo({
          firstName,
          lastName,
          email: user.email,
        });
      }
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;

    setUserInfo({ ...userInfo, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setErrors({ firstName: false, lastName: false, saving: false });

    const { firstName, lastName, email } = userInfo;

    if (firstName.length < 3) {
      setErrors({ ...errors, firstName: true });
      setSaving(false);
      return;
    }
    if (lastName.length < 3) {
      setErrors({ ...errors, lastName: true });
      setSaving(false);
      return;
    }

    try {
      setErrors({ ...errors, saving: false });

      await updateProfile(auth.currentUser, {
        displayName: `${firstName} ${lastName}`,
        email,
      });
      await updateEmail(auth.currentUser, email);

      setSaving(false);

      dispatch(
        setUser({ ...user, displayName: `${firstName} ${lastName}`, email })
      );
      dispatch(goToSpecificEstimateStep(8));
    } catch (error) {
      console.log('error');
      setSaving(false);
      setErrors({ ...errors, saving: true });
      console.error('Error updating user profile:', error);
    }
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

        {!errors.saving ? (
          <span className={styles.error}>Error occurred, try again!</span>
        ) : null}

        <motion.button
          type='submit'
          whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        >
          {saving ? <AiOutlineLoading3Quarters className='loading' /> : 'Save'}
        </motion.button>
      </form>
    </div>
  );
};

export default UserInfoStep;
