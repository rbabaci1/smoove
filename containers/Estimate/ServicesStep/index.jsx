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

  useEffect(() => {
    if (serviceType && !skipStepTwo) {
      dispatch(goToSpecificEstimateStep(3));
      dispatch(enableSkipStepTwo());
    }
  }, [dispatch, skipStepTwo, serviceType]);

  return <div className={styles.container}>ServicesStep</div>;
};

export default ServicesStep;
