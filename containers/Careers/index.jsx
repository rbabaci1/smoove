import { motion } from 'framer-motion';

import styles from './styles.module.scss';

const Careers = () => {
  return (
    <div className={styles.containerWrapper}>
      <motion.div
        className={styles.container}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
      >
        <div className={styles.textContent}>
          <h2>Start making money now</h2>
          <p>
            Be active, meet new people daily & earn up to <span>$2900</span> a
            week!
          </p>

          <motion.button
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            type='submit'
          >
            Get an estimate
          </motion.button>
        </div>

        <div className={styles.bgImg} />
      </motion.div>
    </div>
  );
};

export default Careers;
