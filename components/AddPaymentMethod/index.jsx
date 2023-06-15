import CreditCardInput from 'react-credit-card-input';
import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from './styles.module.scss';

const AddPaymentMethod = () => {
  const [cardInfo, setCardInfo] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    zipCode: '',
    // cardNumber: '',
    // expiry: '',
    // cvc: '',
  });

  const handleCardNumberChange = e => {
    console.log('card number changed:', e.target.value);
  };
  const handleCardExpiryChange = e => {
    console.log('card expiry changed:', e.target.value);
  };
  const handleCardCVCChange = e => {
    console.log('card cvc changed:', e.target.value);
  };

  const handleCardNumberError = e => {
    console.log('card number error:', e);
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log('submitting payment method');
  };

  return (
    <div className={styles.container}>
      <h4>Type your card number</h4>

      <form onSubmit={handleSubmit}>
        <CreditCardInput
          cardNumberInputProps={{
            value: cardInfo.cardNumber,
            onChange: handleCardNumberChange,
          }}
          cardExpiryInputProps={{
            value: cardInfo.expiry,
            onChange: handleCardExpiryChange,
          }}
          cardCVCInputProps={{
            value: cardInfo.cvc,
            onChange: handleCardCVCChange,
          }}
          onError={handleCardNumberError}
          // fieldClassName='input'
          containerClassName={styles.cardInputContainer}
          dangerTextClassName={styles.errorText}
          fieldClassName={styles.inputField}
        />

        <span className={styles.encryptText}>
          This is a payment secured with 256-bit SSL encryption 🔐
        </span>

        <section className={styles.extraInfo}>
          <input
            value={cardInfo.name}
            type='text'
            placeholder='Name on card'
            required
          />
          <input
            value={cardInfo.zipCode}
            type='text'
            placeholder='ZIP code'
            required
          />
        </section>

        <motion.button
          type='submit'
          whileTap={{ scale: 0.95, transition: { duration: 0.1 } }}
        >
          Add card
        </motion.button>
      </form>

      <div className={styles.assureCustomer}>
        <span>Rest assured! </span>
        No charges until your move is done. Cancel anytime without extra fees.
      </div>
    </div>
  );
};

export default AddPaymentMethod;
