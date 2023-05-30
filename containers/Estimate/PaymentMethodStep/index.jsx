import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '@/firebase/firebase.config';

import { getPaymentMethods } from '@/lib';
import styles from './styles.module.scss';
import { AddPaymentMethod } from '@/components';

const PaymentMethodStep = () => {
  const { user } = useSelector(state => state.auth);
  const userId = user?.uid;

  // useEffect(() => {
  //   const fetchPaymentMethods = async () => {
  //     try {
  //       const methods = await getPaymentMethods(userId);
  //     } catch (error) {
  //       console.error('Failed to fetch payment methods:', error);
  //     }
  //   };

  //   if (userId) fetchPaymentMethods();
  // }, [userId]);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <section className={styles.cardNumber}>
          <h3>Phone number</h3>

          <AddPaymentMethod />
        </section>
      </form>
    </div>
  );
};

export default PaymentMethodStep;
