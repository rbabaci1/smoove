import Image from 'next/image';
import { motion } from 'framer-motion';

import { AddressesInput } from '@/components';
import { bgImg } from '@/public/images';
import styles from './styles.module.scss';

const AddressesInputStep = () => {
  return (
    <div className={styles.container}>
      <Image
        src={bgImg}
        alt='gray background with circles'
        className={styles.bgImg}
        priority
      />

      <div className={styles.content}>
        <motion.h2
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
          className={styles.title}
        >
          Pickup & dropOff addresses
        </motion.h2>

        <section className={styles.addresses}>
          <AddressesInput />
        </section>
      </div>
    </div>
  );
};

export default AddressesInputStep;
