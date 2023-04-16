import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { updateAddresses } from '../../reduxSlices/orderSlice';
import styles from './styles.module.scss';

const AddressesInput = ({ buttonText = 'Get an estimate' }) => {
  const addresses = useSelector(state => state.order.addresses);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = event => {
    let { name, value } = event.target;

    dispatch(updateAddresses({ type: name, address: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    router.push('/estimate');
  };

  return (
    <div className={styles.container}>
      <motion.form
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={styles.addresses}
        onSubmit={handleSubmit}
      >
        <section className={styles.pickup}>
          <AiOutlineArrowUp />

          <div className={styles.input}>
            <p>Pickup address</p>
            <input
              type='text'
              placeholder='Enter pickup'
              name='pickup'
              value={addresses.pickup}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        <section className={styles.dropOff}>
          <AiOutlineArrowDown />

          <div className={styles.input}>
            <p>DropOff address</p>
            <input
              type='text'
              placeholder='Enter destination'
              name='dropOff'
              value={addresses.dropOff}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        <motion.button
          whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
          type='submit'
        >
          {buttonText}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default AddressesInput;
