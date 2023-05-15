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
];

import { goToPreviousEstimateStep } from '@/state/reduxSlices/orderSlice';
import styles from './styles.module.scss';

const EstimateNavbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { estimateStep } = useSelector(state => state.order);

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
      </div>
    </div>
  );
};

export default EstimateNavbar;
