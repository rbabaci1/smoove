import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import {
  updateAddresses,
  goToSpecificEstimateStep,
} from '../../reduxSlices/orderSlice';
import { ClickAnimation } from '@/Wrappers/MotionWraps';
import styles from './styles.module.scss';

const AddressesInput = ({
  buttonText = 'Get an estimate',
  animate = false,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const addresses = useSelector(state => state.order.addresses);

  const handleChange = event => {
    let { name, value } = event.target;

    dispatch(updateAddresses({ type: name, address: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(goToSpecificEstimateStep(2));

    // only push to /estimate if we're on the homepage
    router.asPath === '/' && router.push('/estimate');
  };

  return (
    <motion.div
      className={styles.container}
      initial={animate ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <form className={styles.addresses} onSubmit={handleSubmit}>
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

        <ClickAnimation>
          <button type='submit'>{buttonText}</button>
        </ClickAnimation>
      </form>
    </motion.div>
  );
};

export default AddressesInput;
