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
  UserInfoStep,
  PaymentMethodStep,
} from '@/containers/Estimate';
import FinalStep from '@/containers/Estimate/FinalStep';

const transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

const Estimate = () => {
  const { estimateStep } = useSelector(state => state.order);
  const [prevStep, setPrevStep] = useState(estimateStep);

  useEffect(() => {
    setPrevStep(estimateStep);

    // Scroll to top of the page when user changes step
    window.scrollTo(0, 0);
  }, [estimateStep]);

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

  const stepComponents = {
    1: <AddressesInputStep />,
    2: <ServicesStep />,
    3: <ServiceVehiclesStep />,
    4: <ServiceDetailsStep />,
    5: <ServiceDetailsStep />,
    6: <AuthStep />,
    7: <UserInfoStep />,
    8: <PaymentMethodStep />,
    9: <FinalStep />,
  };

  const renderStepContainer = () => {
    return (
      <motion.div
        key={estimateStep}
        className={styles.stepContainer}
        variants={variants}
        initial='enter'
        animate='center'
        exit='exit'
        transition={transition}
      >
        {stepComponents[estimateStep]}
      </motion.div>
    );
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
