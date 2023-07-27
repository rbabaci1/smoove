import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { EstimateNavbar } from '@/components';
import {
  AddressesInputStep,
  ServiceVehiclesStep,
  ServiceDetailsStep,
  AuthStep,
  UserInfoStep,
  PaymentMethodStep,
} from '@/containers/Estimate';
import FinalStep from '@/containers/Estimate/FinalStep';
import styles from './styles.module.scss';

const transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

const Estimate = () => {
  const { estimateStep } = useSelector(state => state.order);
  const [prevStep, setPrevStep] = useState(estimateStep);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [confirmingBooking, setConfirmingBooking] = useState(false);

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
    2: <ServiceVehiclesStep />,
    3: <ServiceDetailsStep showMoreInfo={showMoreInfo} />,
    5: <AuthStep />,
    6: <UserInfoStep />,
    7: <PaymentMethodStep />,
    8: <FinalStep />,
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
        {confirmingBooking ? (
          <div className={styles.loadingContainer}>
            <AiOutlineLoading3Quarters color='green' className='loading' />
          </div>
        ) : null}

        <EstimateNavbar
          showMoreInfo={showMoreInfo}
          setShowMoreInfo={setShowMoreInfo}
          confirmingBooking={confirmingBooking}
          setConfirmingBooking={setConfirmingBooking}
        />

        <div className={styles.background}>
          <div className={styles.stepContainer}>{renderStepContainer()}</div>
        </div>
      </div>
    </>
  );
};

export default Estimate;
