import Image from 'next/image';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { updateAddresses } from '../../reduxSlices/orderSlice';
import styles from './styles.module.scss';

function GetAnEstimate() {
  const router = useRouter();
  const addresses = useSelector(state => state.order.addresses);
  const dispatch = useDispatch();

  const handleChange = event => {
    let { name, value } = event.target;

    dispatch(updateAddresses({ type: name, address: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    router.push('/estimate');
  };

  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <div className={styles.inputs}>
          <h2>Get an estimate</h2>
          <p>
            Your items are insured. We work on your schedule and we will arrive
            in as little as 30 minutes.
          </p>

          <form className={styles.addresses} onSubmit={handleSubmit}>
            <section className={styles.input}>
              <AiOutlineArrowUp />
              <input
                type='text'
                placeholder='Pickup address'
                name='pickup'
                value={addresses.pickup}
                onChange={handleChange}
                className='input'
                required
              />
            </section>

            <section className={styles.input}>
              <AiOutlineArrowDown />
              <input
                type='text'
                placeholder='Drop-off address'
                name='dropOff'
                value={addresses.dropOff}
                onChange={handleChange}
                className='input'
                required
              />
            </section>

            <button type='submit'>Get an estimate</button>
          </form>
        </div>

        <div className={styles.bgImg} />
      </div>
    </div>
  );
}

export default GetAnEstimate;
