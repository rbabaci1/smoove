import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';

import {} from 'reduxSlices/orderSlice.js';
import styles from './styles.module.scss';

const Estimate = () => {
  const order = useSelector(state => state.order);
  const dispatch = useDispatch();
  console.log(order);

  return (
    <>
      <Head>
        <title>Smoove free estimate</title>
        <meta
          name='description'
          content='Get a Free Moving Estimate with Smoove! Enter your move details, including move description, date, time, and contact info, after entering your addresses. Finish your online booking hassle-free with Smoove, your reliable and professional moving partner.'
        />
      </Head>
      <div className={styles.main}>
        <div className={styles.content}>Estimate</div>
      </div>
      ;
    </>
  );
};

export default Estimate;
