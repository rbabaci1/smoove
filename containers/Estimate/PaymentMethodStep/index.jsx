import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { auth } from '@/firebase/firebase.config';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';

import stripeConfig from '@/stripe/stripe.config.js';
import { getPaymentMethods } from '@/lib';
import styles from './styles.module.scss';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentMethodStep = () => {
  const { user } = useSelector(state => state.auth);
  const userId = user?.uid;

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const methods = await getPaymentMethods(userId);
        console.log({ methods });
      } catch (error) {
        console.error('Failed to fetch payment methods:', error);
      }
    };

    fetchPaymentMethods();
  }, [userId]);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <section className={styles.cardNumber}>
          <h3>Phone number</h3>
        </section>
      </form>
    </div>
  );
};

export default PaymentMethodStep;
