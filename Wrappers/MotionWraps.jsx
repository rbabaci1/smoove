import { motion } from 'framer-motion';

export const ClickAnimation = ({ children }) => {
  return (
    <motion.div whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}>
      {children}
    </motion.div>
  );
};
