import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import {
  goToSpecificEstimateStep,
  enableSkipStepTwo,
} from '@/reduxSlices/orderSlice';
import { services } from '@/public/Data';
import styles from './styles.module.scss';
import { ServiceType } from '@/components';

const ServicesStep = goToNextStep => {
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
        <motion.section
          className={styles.header}
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          <h2>Pick Your Perfect Move</h2>
          <span>What suits your needs?</span>

          <div className={styles.services}>
            {services.map(service => (
              <ServiceType key={service} service={service} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ServicesStep;
