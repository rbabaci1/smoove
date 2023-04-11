import { useRouter } from 'next/router';
import Head from 'next/head';

import styles from './styles.module.scss';

const Services = () => {
  const router = useRouter();
  const { query } = router;

  const serviceType = query.type;

  return (
    <>
      <Head>
        <title>Smoove services</title>
        <meta
          name='description'
          content='Update Your Chosen Service and Book Your Move with Smoove! Get a Free Moving Estimate by Entering Your Pickup and DropOff Addresses. Hassle-Free Online Booking with Your Reliable and Professional Moving Partner - Smoove.'
        />
      </Head>
      <div className={styles.main}>Services</div>;
    </>
  );
};

export default Services;
