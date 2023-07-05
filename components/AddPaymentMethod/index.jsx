import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ToastContainer, toast } from 'react-toastify';

import { db, doc, getDoc } from '@/firebase/firebase.config';
import { attachPaymentMethod, createPaymentMethod } from '@/lib';
import 'react-toastify/dist/ReactToastify.css';
import styles from './styles.module.scss';

const CARD_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '19px',
    },
  },
  hidePostalCode: false,
};

const AddPaymentMethod = ({ setShowAddPaymentMethod, setFetchMethods }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useSelector(state => state.auth);
  const [cardName, setCardName] = useState({
    firstName: '',
    lastName: '',
  });
  const [addingCard, setAddingCard] = useState(false);
  const [isCardComplete, setCardComplete] = useState(false);

  const handleChange = e => {
    setCardName({ ...cardName, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Check if card is complete, if not, return
    if (!isCardComplete) return;

    setAddingCard(true);

    try {
      const paymentMethod = await createPaymentMethod(
        stripe,
        elements,
        CardElement
      );
      const userRef = doc(db, 'users', user.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        throw new Error(`User ${userRef.id} does not exist.`);
      }

      const { stripeCustomerId } = userSnapshot.data();
      const cardInfo = {
        id: paymentMethod.id,
        brand: paymentMethod.card.brand,
        last4: paymentMethod.card.last4,
      };

      // First check if method exists, if not, attach it to user
      await attachPaymentMethod(stripeCustomerId, cardInfo);
      toast.success('Card added successfully!');
      setShowAddPaymentMethod(false);
      setFetchMethods(true);
    } catch (error) {
      console.error('Error occurred:', error.message);
      toast.error(error.message);
    } finally {
      setAddingCard(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer
        autoClose={1500}
        position='top-center'
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme='light'
      />

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
          <CardElement
            options={CARD_OPTIONS}
            onChange={e => setCardComplete(e.complete)}
          />
        </div>

        <span className={styles.encryptText}>
          This is a payment secured with 256-bit SSL encryption 🔐
        </span>

        <section className={styles.addBtn}>
          <AnimatePresence>
            {isCardComplete && cardName.firstName && cardName.lastName && (
              <motion.button
                type='submit'
                whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
              >
                {addingCard ? (
                  <AiOutlineLoading3Quarters className='loading' />
                ) : (
                  'Add card'
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </section>
      </form>

      <div className={styles.assureCustomer}>
        <span>Rest assured! </span>
        No charges until your move is done. Cancel anytime without extra fees.
      </div>
    </div>
  );
};

export default AddPaymentMethod;
