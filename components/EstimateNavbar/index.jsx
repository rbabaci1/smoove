import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BiLogOutCircle } from 'react-icons/bi';
import { AiFillLock } from 'react-icons/ai';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { IoBagCheckOutline } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';

const stepsNames = [
  'Provide addresses',
  'Select a vehicle',
  'Select Day & time',
  'Description',
  'Get verified',
  'Personal info',
  'Payment',
  'Checkout',
];

import { auth } from '@/firebase/firebase.config';
import { postOrder } from '@/lib';
import {
  goToNextEstimateStep,
  goToPreviousEstimateStep,
  goToSpecificEstimateStep,
  resetOrder,
} from '@/state/reduxSlices/orderSlice';
import styles from './styles.module.scss';

const EstimateNavbar = ({
  showMoreInfo,
  setShowMoreInfo,
  confirmingBooking,
  setConfirmingBooking,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector(state => state.auth);
  const order = useSelector(state => state.order);

  const { estimateStep, description } = order;

  const handleBack = () => {
    if (confirmingBooking) return;

    if (estimateStep === 1) {
      router.push('/');
    } else if (
      (estimateStep === 7 && user?.displayName && user?.email) ||
      estimateStep === 5 ||
      estimateStep === 6
    ) {
      dispatch(goToSpecificEstimateStep(3));
    } else if (estimateStep === 3 && showMoreInfo) {
      setShowMoreInfo(false);
    } else {
      dispatch(goToPreviousEstimateStep());
    }
  };

  const handleNext = () => {
    if (estimateStep === 3) {
      if (!showMoreInfo) {
        setShowMoreInfo(true);
      } else {
        if (user?.displayName && user?.email) {
          dispatch(goToSpecificEstimateStep(7));
        } else {
          dispatch(goToSpecificEstimateStep(user && showMoreInfo ? 6 : 5));
        }
      }
    } else {
      dispatch(goToNextEstimateStep());
    }
  };

  const handleLogOut = () => {
    if (confirmingBooking) return;

    if (confirm('Are you sure you want to log out?')) {
      router.replace('/');
      auth.signOut();
    }
  };

  const confirmBooking = async () => {
    try {
      if (!user) {
        toast.error('You must be logged in to book a move');
        return;
      }

      setConfirmingBooking(true);

      await postOrder(user, { ...order, status: 'pending' });

      toast.success('Booking confirmed!');

      setTimeout(() => {
        router.replace('/dashboard');
        dispatch(goToSpecificEstimateStep(1));
        dispatch(resetOrder());
      }, 1500);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setConfirmingBooking(false);
    }
  };

  return (
    <div className={styles.navWrapper}>
      <ToastContainer
        position='top-center'
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        theme='colored'
        pauseOnHover={false}
      />

      <div className={styles.container}>
        <section className={styles.navigation}>
          <div className={styles.arrowLeft}>
            <BsArrowLeftShort onClick={handleBack} />
          </div>

          <span>
            {estimateStep === 3 && showMoreInfo ? (
              4
            ) : estimateStep === 6 ? (
              <AiFillLock />
            ) : estimateStep === 7 ? (
              <RiSecurePaymentFill />
            ) : estimateStep === 8 ? (
              <IoBagCheckOutline />
            ) : (
              estimateStep
            )}
          </span>

          <h3>
            {estimateStep === 8 ? (
              <motion.button
                onClick={confirmBooking}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                whileTap={
                  !confirmingBooking
                    ? { scale: 0.9, transition: { duration: 0.1 } }
                    : {}
                }
                disabled={confirmingBooking}
              >
                Book your move
              </motion.button>
            ) : (
              stepsNames[
                estimateStep === 4 && showMoreInfo
                  ? estimateStep
                  : estimateStep - 1
              ]
            )}
          </h3>
        </section>

        <AnimatePresence>
          {(estimateStep === 3 && !showMoreInfo) ||
          (estimateStep === 3 && description.length) ? (
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
