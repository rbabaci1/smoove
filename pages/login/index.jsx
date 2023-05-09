import Head from 'next/head';
import { motion } from 'framer-motion';

import styles from './styles.module.scss';
import { Navbar, Login, NoAuthRender } from '@/components';

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Smoove - login</title>
        <meta
          name='description'
          content='Access your Smoove account dashboard and manage your moves with ease. Login to Smoove and schedule same-day deliveries, view past orders, and customize your settings. Join our trusted moving service for fast and reliable delivery services, and enjoy personalized support from our knowledgeable team. Sign up now and enhance your business with free flyers. Join Smoove for a seamless experience in managing your moves.'
        />
      </Head>

      <div className={styles.main}>
        <Navbar />

        <div className={styles.content}>
          <motion.section
            className={styles.header}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
          >
            <h1>Hello there!</h1>
            <span>Tap your digits, gain access!</span>
          </motion.section>

          <Login />
        </div>
      </div>
    </>
  );
};

export default NoAuthRender(LoginPage);
