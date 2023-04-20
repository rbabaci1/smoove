import { motion } from 'framer-motion';

import { AddressesInput } from '@/components';
import styles from './styles.module.scss';

const AddressesInputStep = () => {
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
          <h2>Enter Moving addresses</h2>
          <span>Enter your pickup & dropOff addresses</span>
        </motion.section>

        <section className={styles.addresses}>
          <AddressesInput />
        </section>
      </div>
    </div>
  );
};

export default AddressesInputStep;
