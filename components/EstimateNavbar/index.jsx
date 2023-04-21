import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { BsArrowLeftShort } from 'react-icons/bs';
import { BiListUl } from 'react-icons/bi';
import { MdLockReset } from 'react-icons/md';

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
  goToSpecificEstimateStep,
} from '@/reduxSlices/orderSlice';

const EstimateNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { estimateStep } = useSelector(state => state.order);

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
          <button onClick={handleBack} className={styles.arrowLeft}>
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
        </section>

        <section className={styles.logo}>
          <h2 onClick={() => router.push('/')}>Smoove</h2>
        </section>

        <button className={styles.resetSteps}>
          <MdLockReset onClick={handleReset} />
        </button>
      </div>
    </div>
  );
};

export default EstimateNavbar;
