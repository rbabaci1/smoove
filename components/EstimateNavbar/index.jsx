import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BiListUl } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

const stepsNames = [
  'Provide addresses',
  'Select a category',
  'Select a vehicle',
  'Select Day & time',
  'Provide a description',
  'Get verified',
];

import styles from './styles.module.scss';
import {
  goToPreviousEstimateStep,
  goToSpecificEstimateStep,
  goToNextEstimateStep,
} from '@/reduxSlices/orderSlice';

const EstimateNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { estimateStep } = useSelector(state => state.order);

  const handleNext = () => {
    dispatch(goToNextEstimateStep());
  };

  const handleBack = () => {
    estimateStep === 1
      ? router.push('/')
      : dispatch(goToPreviousEstimateStep());
  };

  const handleReset = () => {
    dispatch(goToSpecificEstimateStep(1));
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

        <section className={styles.resetSteps}>
          <IoClose onClick={handleReset} />
        </section>

        {estimateStep > 1 && (
          <button className={styles.nextButton} onClick={handleNext}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default EstimateNavbar;
