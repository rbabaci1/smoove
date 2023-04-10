import Head from 'next/head';

import styles from './styles.module.scss';

const Estimate = () => {
  return (
    <>
      <Head>
        <title>Move Estimate</title>
        <meta
          name='description'
          content='Get a Free Moving Estimate with Smoove! Enter your move details, including move description, date, time, and contact info, after entering your addresses. Finish your online booking hassle-free with Smoove, your reliable and professional moving partner.'
        />
      </Head>
      <div className={styles.main}>Estimate</div>;
    </>
  );
};

export default Estimate;
