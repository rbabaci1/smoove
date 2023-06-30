import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AddPaymentMethod } from '@/components';
import { db, doc, getDoc } from '@/firebase/firebase.config';

import styles from './styles.module.scss';
import { checkTargetForNewValues } from 'framer-motion';

const PaymentMethodStep = () => {
  const { user } = useSelector(state => state.auth);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);

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

  return (
    <div className={styles.container}>
      <div className={styles.paymentMethods}>
        <h3>Payment Information</h3>

        {showAddPaymentMethod ? (
          <section className={styles.paymentMethods__input}>
            <AddPaymentMethod
              setShowAddPaymentMethod={setShowAddPaymentMethod}
            />
          </section>
        ) : (
          <>
            <section className={styles.selectPaymentMethod}>
              <select>
                <option value='option1'>Option 1</option>
                <option value='option2'>Option 2</option>
                <option value='option3'>Option 3</option>
                <option value='option4'>Option 4</option>
              </select>
            </section>

            <button onClick={() => setShowAddPaymentMethod(true)}>
              Add card
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentMethodStep;
