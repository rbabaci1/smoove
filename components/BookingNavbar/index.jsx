import { useSelector, useDispatch } from 'react-redux';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const stepsNames = [
  'Move addresses',
  'Select a service',
  'Select a vehicle',
  'Confirm service',
  'Move details',
  'Personal details',
];

import styles from './styles.module.scss';
import {
  goToPreviousEstimateStep,
  resetEstimateSteps,
} from '@/reduxSlices/orderSlice';

const BookingNavbar = () => {
  const dispatch = useDispatch();
  const { serviceType, estimateStep } = useSelector(state => state.order);

  const handleBack = () => {
    dispatch(goToPreviousEstimateStep());
  };

  const handleReset = () => {
    dispatch(resetEstimateSteps());
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.container}>
        <div className={styles.navigation}>
          <button disabled={estimateStep === 1} onClick={handleBack}>
            <BsArrowLeft />
          </button>

          <span>{estimateStep}</span>

          <h3>{stepsNames[estimateStep - 1]}</h3>
        </div>

        <div className={styles.logo}>
          <h2>Smoove</h2>
        </div>

        <div className={styles.resetSteps}>
          <AiOutlineCloseCircle onClick={handleReset} />
        </div>
      </div>
    </div>
  );
};

export default BookingNavbar;
