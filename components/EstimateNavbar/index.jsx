import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BiListUl } from 'react-icons/bi';

const stepsNames = [
  'Provide addresses',
  'Select a category',
  'Select a vehicle',
  'Select Day & time',
  'Description',
  'Get verified',
  'Personal info',
  'Payment',
  'Checkout',
];

import {
  goToNextEstimateStep,
  goToPreviousEstimateStep,
  goToSpecificEstimateStep,
} from '@/state/reduxSlices/orderSlice';
import styles from './styles.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

const EstimateNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { estimateStep, description } = useSelector(state => state.order);
  const { user } = useSelector(state => state.auth);

  const handleBack = () => {
    if (estimateStep === 1) {
      router.push('/');
    } else if (estimateStep === 7 && user) {
      dispatch(goToSpecificEstimateStep(5));
    } else {
      dispatch(goToPreviousEstimateStep());
    }
  };

  const handleNext = () => {
    if (estimateStep === 5 && user) {
      dispatch(goToSpecificEstimateStep(7));
    } else {
      dispatch(goToNextEstimateStep());
    }
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

        <AnimatePresence>
          {estimateStep === 4 || (estimateStep === 5 && description.length) ? (
            <section className={styles.nextButton}>
              <motion.button
                onClick={handleNext}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
              >
                Next
              </motion.button>
            </section>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EstimateNavbar;
