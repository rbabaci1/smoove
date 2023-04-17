import Head from 'next/head';

import styles from './styles.module.scss';

const Partner = () => {
  return (
    <>
      <Head>
        <title>Become a partner - Smoove</title>
        <meta
          name='description'
          content={`Join the Smoove Partner Program and offer same-day delivery for your store with Smoove, your trusted moving partner. Sign up today to become a Smoove partner and connect with our knowledgeable team for prompt assistance and solutions. Enhance your business with free flyers and start fulfilling same-day deliveries to your customers as early as the next day. Join Smoove now for a seamless experience and personalized support on your journey to providing fast and reliable delivery services through our trusted moving service.`}
        />
      </Head>

      <div className={styles.main}>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1>Same day deliver</h1>
            <p>Empower your store to fulfill same-day delivery requests!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partner;
