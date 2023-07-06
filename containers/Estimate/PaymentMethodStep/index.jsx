import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';
import { AiOutlineLoading3Quarters, AiFillCloseCircle } from 'react-icons/ai';
import { motion, AnimatePresence } from 'framer-motion';

import { AddPaymentMethod } from '@/components';
import { db, doc, getDoc } from '@/firebase/firebase.config';
import { visa, amex, mastercard, discover } from '@/public/images';
import styles from './styles.module.scss';

const PaymentMethodStep = () => {
  const { user } = useSelector(state => state.auth);

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [fetchMethods, setFetchMethods] = useState(true);
  const [fetchingMethods, setFetchingMethods] = useState(true);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [showMethods, setShowMethods] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const methodsRef = useRef(null);
  const selectRef = useRef(null);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          return res.status(400).json({ message: 'User does not exist' });
        }

        const { stripeCustomerId } = userSnapshot.data();
        setFetchingMethods(true);

        const response = await fetch('/api/getPaymentMethods', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stripeCustomerId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch payment methods');
        }

        const paymentMethods = await response.json();
        setPaymentMethods(paymentMethods);

        // Check if payment methods exist
        if (paymentMethods?.length > 0) {
          setShowAddPaymentMethod(false);
          setSelectedMethod(paymentMethods[0].card);
        } else {
          setShowAddPaymentMethod(true);
        }
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
        setShowAddPaymentMethod(true);
      } finally {
        setFetchingMethods(false);
      }
    };

    if (user && fetchMethods) {
      fetchPaymentMethods();
      setFetchMethods(false);
    }
  }, [user, fetchMethods]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        methodsRef.current &&
        !methodsRef.current.contains(event.target) &&
        !selectRef.current.contains(event.target)
      ) {
        setShowMethods(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectMethod = method => {
    setSelectedMethod(method);
    setShowMethods(false);
  };

  const getCardImg = brand =>
    brand === 'visa'
      ? visa
      : brand === 'amex'
      ? amex
      : brand === 'mastercard'
      ? mastercard
      : discover;

  const toggleMethods = () => {
    setShowMethods(!showMethods);
  };

  return (
    <div
      className={`${styles.container} ${
        fetchingMethods ? styles.fetchingMethods : ''
      }`}
    >
      <div className={styles.paymentMethods}>
        {fetchingMethods ? (
          <AiOutlineLoading3Quarters className={`${styles.loading} loading`} />
        ) : (
          <>
            <h3>
              Payment Information
              {showAddPaymentMethod && selectedMethod && (
                <AiFillCloseCircle
                  onClick={() => setShowAddPaymentMethod(false)}
                />
              )}
            </h3>

            {showAddPaymentMethod ? (
              <div className={styles.paymentMethods__input}>
                <AddPaymentMethod
                  setShowAddPaymentMethod={setShowAddPaymentMethod}
                  setFetchMethods={setFetchMethods}
                />
              </div>
            ) : (
              <>
                <div
                  className={styles.methodSelection}
                  onClick={toggleMethods}
                  ref={selectRef}
                >
                  {selectedMethod ? (
                    <section className={styles.selectedMethod}>
                      <Image
                        src={getCardImg(selectedMethod.brand)}
                        alt='credit card sign'
                        height={40}
                        width={40}
                      />
                      <span>
                        {selectedMethod.brand} ending in ...
                        {selectedMethod.last4}
                      </span>
                    </section>
                  ) : (
                    <p>Select a method</p>
                  )}

                  {showMethods ? (
                    <RiArrowDropUpLine />
                  ) : (
                    <RiArrowDropDownLine />
                  )}
                </div>

                <AnimatePresence>
                  {showMethods && (
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 25 }}
                      className={styles.methods}
                      ref={methodsRef}
                    >
                      {paymentMethods.map(method => {
                        const { brand, last4 } = method.card;

                        if (selectedMethod?.last4 === last4) return;

                        return (
                          <section
                            className={styles.method}
                            key={method.id}
                            onClick={() => selectMethod(method.card)}
                          >
                            <Image
                              src={getCardImg(brand)}
                              alt='Credit card sign'
                              height={40}
                              width={40}
                            />
                            <span>
                              {brand} ending in ...{last4}
                            </span>
                          </section>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={() => setShowAddPaymentMethod(true)}
                  disabled={showMethods}
                >
                  Add card
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodStep;
