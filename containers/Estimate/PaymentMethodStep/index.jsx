import { auth } from '@/firebase/firebase.config';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';

import stripeConfig from '@/stripe/stripe.config.js';
import styles from './styles.module.scss';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const PaymentMethodStep = () => {
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
