import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateProfile, updateEmail } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';

import { auth } from '@/firebase/firebase.config';
import { setUser } from '@/state/reduxSlices/authSlice';
import styles from './styles.module.scss';

const MyAccount = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { displayName, email, phoneNumber } = user;
  const [firstName, lastName] = displayName.split(' ');

  const [userInfoChanged, setUserInfoChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [userInfo, setUserInfo] = useState({
    firstName,
    lastName,
    email,
  });

  const handleChange = e => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(value));
    }
  };

  useEffect(() => {
    if (
      userInfo.firstName !== firstName ||
      userInfo.lastName !== lastName ||
      userInfo.email !== email
    ) {
      setUserInfoChanged(true);
    } else {
      setUserInfoChanged(false);
    }
  }, [userInfo, firstName, lastName, email]);

  const handleSaveChanges = async () => {
    if (firstName.length < 3) {
      toast.error('First name must be at least 3 characters long');
      return;
    }
    if (lastName.length < 3) {
      toast.error('Last name must be at least 3 characters long');
      return;
    }
    if (!isEmailValid) {
      toast.error('Please enter a valid email');
      return;
    }

    try {
      setIsSaving(true);

      const displayName = `${userInfo.firstName} ${userInfo.lastName}`;

      await updateProfile(auth.currentUser, {
        displayName,
        email: userInfo.email,
      });
      await updateEmail(auth.currentUser, userInfo.email);

      dispatch(setUser({ ...user, displayName, email: userInfo.email }));

      toast.success('Your info has been updated!');
      setUserInfoChanged(false);
    } catch (error) {
      console.error('Error updating user info:', error.message);
      toast.error('Error updating user info: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.personalInfo}>
        <section className={styles.header}>
          <h3>Personal info</h3>

          <ToastContainer
            position='top-center'
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            rtl={false}
            theme='colored'
            pauseOnHover={false}
          />

          <AnimatePresence>
            {userInfoChanged ? (
              <motion.button
                onClick={handleSaveChanges}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                {isSaving ? (
                  <AiOutlineLoading3Quarters className='loading' />
                ) : (
                  'Save'
                )}
              </motion.button>
            ) : (
              <button style={{ visibility: 'hidden', pointerEvents: 'none' }}>
                Save
              </button>
            )}
          </AnimatePresence>
        </section>

        <section className={styles.info}>
          <input
            type='text'
            name='firstName'
            value={userInfo.firstName}
            onChange={handleChange}
            disabled={isSaving}
          />

          <input
            type='text'
            name='lastName'
            value={userInfo.lastName}
            onChange={handleChange}
            disabled={isSaving}
          />

          <input
            type='email'
            name='email'
            value={userInfo.email}
            onChange={handleChange}
            disabled={isSaving}
          />
        </section>
      </div>

      <div className={styles.paymentInfo}>
        <h3>Payment info</h3>
      </div>
    </div>
  );
};

export default MyAccount;
