import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { useRouter } from 'next/router';

import { updateAddresses } from '../../reduxSlices/orderSlice';
import styles from './styles.module.scss';

const AddressesInput = ({ buttonText = 'Get an estimate' }) => {
  const addresses = useSelector(state => state.order.addresses);
  const dispatch = useDispatch();
  const router = useRouter();

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
      <div className={styles.header}>
        <h1>
          <span>Smoove</span> anything!
        </h1>
        <p>On your schedule. Arriving in as little as 25 minutes.</p>
      </div>

      <form className={styles.addresses} onSubmit={handleSubmit}>
        <div className={styles.pickup}>
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
        </div>

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

        <button type='submit'>{buttonText}</button>
      </form>
    </div>
  );
};

export default AddressesInput;
