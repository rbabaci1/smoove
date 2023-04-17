import { motion } from 'framer-motion';

import styles from './styles.module.scss';

const ErrorMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }} // initial position of the span
      animate={{ opacity: 1, y: 0 }} // final position of the span
      exit={{ opacity: 0, y: 40 }} // exit position of the span
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className={styles.container}
    >
      <span>This field is required</span>
    </motion.div>
  );
};

export default ErrorMessage;
