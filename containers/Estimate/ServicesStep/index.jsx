import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  goToSpecificEstimateStep,
  enableSkipStepTwo,
} from '@/reduxSlices/orderSlice';
import styles from './styles.module.scss';

const ServicesStep = () => {
  const dispatch = useDispatch();
  const { serviceType, skipStepTwo } = useSelector(state => state.order);

  // If serviceType is selected, go to step 3
  useEffect(() => {
    if (serviceType && !skipStepTwo) {
      dispatch(goToSpecificEstimateStep(3));
      dispatch(enableSkipStepTwo());
    }
  }, [dispatch, skipStepTwo, serviceType]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Pick Your Perfect Move</h2>
      </div>
    </div>
  );
};

export default ServicesStep;
