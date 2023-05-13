import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import styles from './styles.module.scss';
import { EstimateNavbar } from '@/components';
import {
  AddressesInputStep,
  ServicesStep,
  ServiceVehiclesStep,
  ServiceDetailsStep,
  AuthStep,
} from '@/containers/Estimate';

const Estimate = () => {
  const { estimateStep } = useSelector(state => state.order);
  const [prevStep, setPrevStep] = useState(estimateStep);

  useEffect(() => {
    setPrevStep(estimateStep);

    // Scroll to top of the page when user changes step
    window.scrollTo(0, 0);
  }, [estimateStep]);

  const renderStepContainer = () => {
    const variants = {
      enter: {
        x: estimateStep > prevStep ? '100vw' : '-100vw',
        opacity: 0,
      },
      center: {
        x: 0,
        opacity: 1,
      },
      exit: {
        x: estimateStep > prevStep ? '-100vw' : '100vw',
        opacity: 0,
      },
    };

    const transition = {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    };

    switch (estimateStep) {
      case 1:
        return (
          <motion.div
            key={1}
            className={styles.stepContainer}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={transition}
          >
            <AddressesInputStep />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key={2}
            className={styles.stepContainer}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={transition}
          >
            <ServicesStep />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key={3}
            className={styles.stepContainer}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={transition}
          >
            <ServiceVehiclesStep />
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key={4}
            className={styles.stepContainer}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={transition}
          >
            <ServiceDetailsStep />
          </motion.div>
        );
      case 5:
        return (
          <motion.div
            key={4}
            className={styles.stepContainer}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={transition}
          >
            <ServiceDetailsStep />
          </motion.div>
        );
      case 6:
        return (
          <motion.div
            key={6}
            className={styles.stepContainer}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={transition}
          >
            <AuthStep />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key={1}
            className={styles.stepContainer}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={transition}
          >
            <AddressesInputStep />
          </motion.div>
        );
    }
  };

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
        <EstimateNavbar />

        <div className={styles.background}>
          <div className={styles.stepContainer}>{renderStepContainer()}</div>
        </div>
      </div>
    </>
  );
};

export default Estimate;
