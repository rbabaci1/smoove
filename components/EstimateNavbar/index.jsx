import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { BsArrowLeftShort } from 'react-icons/bs';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { BiListUl } from 'react-icons/bi';

const stepsNames = [
  'Provide addresses',
  'Select a category',
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

const EstimateNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { estimateStep } = useSelector(state => state.order);

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
            <BsArrowLeftShort />
          </button>

          {estimateStep > 1 ? (
            <span>{estimateStep}</span>
          ) : (
            <span>
              <BiListUl />
            </span>
          )}

          <h3>{stepsNames[estimateStep - 1]}</h3>
        </div>

        <div className={styles.logo}>
          <h2 onClick={() => router.push('/')}>Smoove</h2>
        </div>

        <div className={styles.resetSteps}>
          <IoIosCloseCircleOutline onClick={handleReset} />
        </div>
      </div>
    </div>
  );
};

export default EstimateNavbar;
