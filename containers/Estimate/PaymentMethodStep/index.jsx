import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Select, Space } from 'antd';

import { AddPaymentMethod } from '@/components';
import { db, doc, getDoc } from '@/firebase/firebase.config';

import styles from './styles.module.scss';
import { checkTargetForNewValues } from 'framer-motion';
import { visa, amex, mastercard, discover } from '@/public/images';

const PaymentMethodStep = () => {
  const { user } = useSelector(state => state.auth);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showAddPaymentMethod, setShowAddPaymentMethod] = useState(false);

  console.log('paymentMethods', paymentMethods);

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

  const handleChange = value => {
    console.log(`selected ${value}`);
  };

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
            <Image src={visa} alt='' height={40} width={40} />

            <section className={styles.selectPaymentMethod}>
              <Select
                defaultValue='lucy'
                onChange={handleChange}
                style={{
                  width: 120,
                }}
                options={[
                  {
                    value: 'lucy',
                    label: 'Lucy',
                  },
                  {
                    value: 'disabled',
                    label: 'Disabled',
                    disabled: true,
                  },
                ]}
              />
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
