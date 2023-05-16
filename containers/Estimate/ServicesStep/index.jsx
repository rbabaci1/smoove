import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  goToSpecificEstimateStep,
  enableServiceTypeSelected,
  updateOrderStatus,
} from '@/state/reduxSlices/orderSlice';
import { ServiceType } from '@/components';
import { service1, service2, service3, service4 } from '@/public/images';
import styles from './styles.module.scss';

const ServicesStep = () => {
  const dispatch = useDispatch();
  const { serviceType, serviceTypeSelected } = useSelector(
    state => state.order
  );

  // If serviceType is selected, go to step 3
  useEffect(() => {
    if (serviceType && !serviceTypeSelected) {
      dispatch(goToSpecificEstimateStep(3));
    }

    dispatch(enableServiceTypeSelected());
    dispatch(updateOrderStatus('draft'));
  }, [dispatch, serviceTypeSelected, serviceType]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.header}>
          <h2>Pick Your Ideal Move</h2>
          <span>What suits your needs?</span>
        </section>

        <div className={styles.services}>
          <ServiceType
            service='Regular move'
            img={service1}
            uniqueStyles={{ top: '1rem' }}
          />
          <ServiceType
            service='Store delivery'
            img={service2}
            uniqueStyles={{ transform: 'scale(0.95)', top: '0.3rem' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesStep;
