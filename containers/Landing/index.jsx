import { motion } from 'framer-motion';

import { Carousel, AddressesInput } from '@/components';
import styles from './styles.module.scss';

const Landing = () => {
  return (
    <div className={styles.container}>
      <Carousel />

      <div className={styles.content}>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <h1>
            <span>Smoove</span> anything!
          </h1>
          <p>On your schedule. Arriving in as little as 25 minutes.</p>
        </motion.div>

        <AddressesInput animate={true} />
      </div>
    </div>
  );
};

export default Landing;
