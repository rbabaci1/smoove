import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import {
  goToSpecificEstimateStep,
  enableSkipStepTwo,
} from '@/reduxSlices/orderSlice';
import { ServiceType } from '@/components';
import { service1, service2, service3, service4 } from '@/public/images';
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
            <section className={styles.top}>
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
            </section>

            <section className={styles.bottom}>
              <ServiceType
                service='Dumping'
                img={service3}
                uniqueStyles={{ transform: 'scale(0.95)', top: '0.3rem' }}
              />
              <ServiceType
                service='Donations'
                img={service4}
                uniqueStyles={{ top: '0.3rem' }}
              />
            </section>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ServicesStep;
