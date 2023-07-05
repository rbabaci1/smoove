import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RiArrowDropDownLine, RiArrowDropUpLine } from 'react-icons/ri';

import { AddPaymentMethod } from '@/components';
import { db, doc, getDoc } from '@/firebase/firebase.config';

import styles from './styles.module.scss';

import { visa, amex, mastercard, discover } from '@/public/images';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentMethodStep = () => {
  const { user } = useSelector(state => state.auth);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);
  const [showMethods, setShowMethods] = useState(false);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const userRef = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          return res.status(400).json({ message: 'User does not exist' });
        }

        const { stripeCustomerId } = userSnapshot.data();

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
        } else {
          setShowAddPaymentMethod(true);
        }
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
        setShowAddPaymentMethod(true);
      }
    };

    if (user) fetchPaymentMethods();
  }, [user]);

  const selectMethod = method => {
    setSelectedPaymentMethod(method);
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
    <div className={styles.container}>
      <div className={styles.paymentMethods}>
        <h3>Payment Information</h3>

        {showAddPaymentMethod ? (
          <div className={styles.paymentMethods__input}>
            <AddPaymentMethod
              setShowAddPaymentMethod={setShowAddPaymentMethod}
            />
          </div>
        ) : (
          <>
            <div className={styles.methodSelection} onClick={toggleMethods}>
              {selectedPaymentMethod ? (
                <section className={styles.selectedMethod}>
                  <Image
                    src={getCardImg(selectedPaymentMethod.brand)}
                    alt='credit card sign'
                    height={40}
                    width={40}
                  />
                  <span>
                    {selectedPaymentMethod.brand} ending in ...
                    {selectedPaymentMethod.last4}
                  </span>
                </section>
              ) : (
                <p>Select a method</p>
              )}

              {showMethods ? <RiArrowDropUpLine /> : <RiArrowDropDownLine />}
            </div>

            <AnimatePresence>
              {showMethods && (
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 25 }}
                  className={styles.methods}
                >
                  {paymentMethods.map(method => {
                    const { brand, last4 } = method.card;

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
      </div>
    </div>
  );
};

export default PaymentMethodStep;
