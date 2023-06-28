import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { db, doc, getDoc } from '@/firebase/firebase.config';
import styles from './styles.module.scss';

const AddPaymentMethod = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useSelector(state => state.auth);
  const [cardName, setCardName] = useState({
    firstName: '',
    lastName: '',
  });
  const [addingCard, setAddingCard] = useState(false);
  const [isCardComplete, setCardComplete] = useState(false);

  const CARD_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '19px',
      },
    },
  };

  const handleChange = e => {
    setCardName({ ...cardName, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isCardComplete) {
      console.log('Please fill out the card details.');
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        throw error;
      }

      const userRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const { stripeCustomerId } = userSnapshot.data();

        const res = await fetch('/api/addPaymentMethod', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            stripeCustomerId,
            paymentMethodId: paymentMethod.id,
          }),
        });
      } else {
        console.log('No such user!');
      }
    } catch (error) {
      console.error('Error occurred:', error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <section className={styles.extraInfo}>
          <input
            value={cardName.firstName}
            name='firstName'
            type='text'
            placeholder='First name'
            onChange={handleChange}
            required
          />
          <input
            value={cardName.lastName}
            name='lastName'
            type='text'
            placeholder='Last name'
            onChange={handleChange}
            required
          />
        </section>

        <h4>Type your card number</h4>

        <div className={styles.cardElementWrapper}>
          <CardElement options={CARD_OPTIONS} />
        </div>

        <span className={styles.encryptText}>
          This is a payment secured with 256-bit SSL encryption 🔐
        </span>

        <AnimatePresence>
          <motion.button
            type='submit'
            whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Add card
          </motion.button>
        </AnimatePresence>
      </form>

      <div className={styles.assureCustomer}>
        <span>Rest assured! </span>
        No charges until your move is done. Cancel anytime without extra fees.
      </div>
    </div>
  );
};

export default AddPaymentMethod;
