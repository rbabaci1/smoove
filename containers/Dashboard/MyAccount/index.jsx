import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Image from 'next/image';
import { updateProfile, updateEmail } from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';

import { auth } from '@/firebase/firebase.config';
import { getCardImgSrc, getUserPaymentMethods, formatPhoneNumber } from '@/lib';
import { setUser } from '@/state/reduxSlices/authSlice';
import { AddPaymentMethod } from '@/components';
import styles from './styles.module.scss';

const MyAccount = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { displayName, email, phoneNumber } = user;
  const [firstName, lastName] = displayName ? displayName.split(' ') : ['', ''];

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [paymentMethodsFetched, setPaymentMethodsFetched] = useState(false);
  const [fetchingMethods, setFetchingMethods] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState(null);
  const [userInfoChanged, setUserInfoChanged] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [userInfo, setUserInfo] = useState({
    firstName,
    lastName,
    email,
  });

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const paymentMethods = await getUserPaymentMethods(
          user.uid,
          setFetchingMethods
        );

        setPaymentMethods(paymentMethods);
      } catch (error) {
        console.error('Error fetching payment methods:', error);
        toast.error(error.message);
      } finally {
        setPaymentMethodsFetched(true);
      }
    };

    if (user) {
      fetchPaymentMethods();
    }
  }, [user]);

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

  const handleCardDelete = async cardId => {
    if (confirm('Are you sure you want to delete this card?')) {
      try {
        setDeletingCardId(cardId);

        const response = await fetch('/api/deletePaymentMethod', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cardId }),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || 'Failed to delete payment method.');
        } else {
          setPaymentMethods(prevState =>
            prevState.filter(method => method.id !== cardId)
          );
          toast.success('Payment method deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting payment method:', error.message);
        toast.error(error.message);
      } finally {
        setDeletingCardId(null);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.personalInfo}>
        <section className={styles.header}>
          <ToastContainer
            position='top-center'
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            rtl={false}
            theme='colored'
            pauseOnHover={false}
          />

          <h3>Personal info</h3>

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
        <div className={styles.header_}>
          <h3>Your cards</h3>
          {fetchingMethods ? (
            <AiOutlineLoading3Quarters
              className={`${styles.loading} loading`}
            />
          ) : null}
        </div>

        <AnimatePresence>
          {paymentMethodsFetched ? (
            <motion.div
              className={styles.methods}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              {paymentMethods.length > 0
                ? paymentMethods.map((method, i) => (
                    <div key={method.id} className={styles.method}>
                      <div className={styles.methodInfo}>
                        <Image
                          src={getCardImgSrc(method.card.brand)}
                          width={35}
                          height={35}
                          alt='credit card symbol'
                        />

                        <p>
                          {method.card.brand.charAt(0).toUpperCase() +
                            method.card.brand.slice(1)}{' '}
                          ending in ...{method.card.last4}
                        </p>

                        {i === 0 ? (
                          <p className={styles.default}>Default</p>
                        ) : null}
                      </div>

                      <button onClick={() => handleCardDelete(method.id)}>
                        {deletingCardId === method.id ? (
                          <AiOutlineLoading3Quarters
                            className={`${styles.loading} loading`}
                          />
                        ) : (
                          'X'
                        )}
                      </button>
                    </div>
                  ))
                : 'You have no saved cards.'}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className={styles.addPaymentForm}>
        {showAddPaymentMethod ? (
          <AddPaymentMethod
            setShowAddPaymentMethod={setShowAddPaymentMethod}
            paymentMethods={paymentMethods}
            setPaymentMethods={setPaymentMethods}
          />
        ) : null}
      </div>

      {paymentMethodsFetched ? (
        <motion.div
          className={styles.addCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => setShowAddPaymentMethod(!showAddPaymentMethod)}
            className={showAddPaymentMethod ? styles.cancelBtn : null}
          >
            {showAddPaymentMethod ? 'Cancel' : 'Add new card'}
          </button>
        </motion.div>
      ) : null}

      <div className={styles.phoneNumber}>
        <h3>Phone number</h3>
        <h2>{formatPhoneNumber(phoneNumber)}</h2>
        <span>
          You’ll receive updates about the status of your move via this phone
          number.
        </span>
      </div>
    </div>
  );
};

export default MyAccount;
