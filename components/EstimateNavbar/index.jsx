import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BiListUl } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';

const stepsNames = [
  'Provide addresses',
  'Select a category',
  'Select a vehicle',
  'Select Day & time',
  'Provide a description',
  'Get verified',
];

import {
  goToPreviousEstimateStep,
  goToNextEstimateStep,
} from '@/reduxSlices/orderSlice';
import styles from './styles.module.scss';

const EstimateNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    serviceType,
    vehicleType,
    estimateStep,
    movingDate,
    movingWindow,
    description,
  } = useSelector(state => state.order);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    setShowNextButton(
      estimateStep > 1 &&
        ((estimateStep === 2 && serviceType) ||
          (estimateStep === 3 && vehicleType) ||
          (estimateStep === 4 && movingDate && movingWindow) ||
          (estimateStep === 5 && description))
    );
  }, [
    estimateStep,
    serviceType,
    vehicleType,
    movingDate,
    movingWindow,
    description,
  ]);

  const handleNext = () => {
    dispatch(goToNextEstimateStep());
  };

  const handleBack = () => {
    estimateStep === 1
      ? router.push('/')
      : dispatch(goToPreviousEstimateStep());
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.container}>
        <section className={styles.navigation}>
          <div className={styles.arrowLeft}>
            <BsArrowLeftShort onClick={handleBack} />
          </div>

          {estimateStep > 1 ? (
            <span>{estimateStep}</span>
          ) : (
            <span>
              <BiListUl />
            </span>
          )}

          <h3>{stepsNames[estimateStep - 1]}</h3>
        </section>

        <section className={styles.logo}>
          <h2 onClick={() => router.push('/')}>Smoove</h2>
        </section>

        <AnimatePresence>
          {showNextButton && (
            <motion.section
              className={styles.nextButton}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
            >
              <button onClick={handleNext}>Next</button>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EstimateNavbar;
