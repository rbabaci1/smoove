import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BiListUl, BiLogOutCircle } from 'react-icons/bi';
import { AiFillLock } from 'react-icons/ai';
import { RiSecurePaymentFill } from 'react-icons/ri';

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

import { auth } from '@/firebase/firebase.config';
import {
  goToNextEstimateStep,
  goToPreviousEstimateStep,
  goToSpecificEstimateStep,
} from '@/state/reduxSlices/orderSlice';
import styles from './styles.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

const EstimateNavbar = ({ showMoreInfo, setShowMoreInfo }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { estimateStep, description } = useSelector(state => state.order);
  const { user } = useSelector(state => state.auth);

  const handleBack = () => {
    if (estimateStep === 1) {
      router.push('/');
    } else if (
      (estimateStep === 8 && user?.displayName && user?.email) ||
      estimateStep === 6 ||
      estimateStep === 7
    ) {
      dispatch(goToSpecificEstimateStep(4));
    } else if (estimateStep === 4 && showMoreInfo) {
      setShowMoreInfo(false);
    } else {
      dispatch(goToPreviousEstimateStep());
    }
  };

  const handleNext = () => {
    if (estimateStep === 4) {
      if (!showMoreInfo) {
        setShowMoreInfo(true);
      } else {
        if (user?.displayName && user?.email) {
          dispatch(goToSpecificEstimateStep(8));
        } else {
          dispatch(goToSpecificEstimateStep(showMoreInfo && user ? 7 : 6));
        }
      }
    } else {
      dispatch(goToNextEstimateStep());
    }
  };

  const handleLogOut = () => {
    // router.push('/');
    // auth.signOut();
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.container}>
        <section className={styles.navigation}>
          <div className={styles.arrowLeft}>
            <BsArrowLeftShort onClick={handleBack} />
          </div>

          {estimateStep > 1 ? (
            <span>
              {estimateStep === 4 && showMoreInfo ? (
                5
              ) : estimateStep === 7 ? (
                <AiFillLock />
              ) : estimateStep === 8 ? (
                <RiSecurePaymentFill />
              ) : (
                estimateStep
              )}
            </span>
          ) : (
            <span>
              <BiListUl />
            </span>
          )}

          <h3>
            {
              stepsNames[
                estimateStep === 4 && showMoreInfo
                  ? estimateStep
                  : estimateStep - 1
              ]
            }
          </h3>
        </section>

        <AnimatePresence>
          {estimateStep === 4 || (estimateStep === 5 && description.length) ? (
            <section className={styles.nextButton}>
              <motion.button
                onClick={handleNext}
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 40, opacity: 0 }}
                whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
              >
                Next
              </motion.button>
            </section>
          ) : estimateStep >= 7 ? (
            <section className={styles.logOutBtn}>
              <BiLogOutCircle onClick={handleLogOut} />
            </section>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EstimateNavbar;
