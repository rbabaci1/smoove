import { useState } from 'react';
import Image from 'next/image';

import { map } from '@/public/images';
import styles from './styles.module.scss';

const ServiceDetailsStep = () => {
  const [showMovingDescription, setShowMovingDescription] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.dateTimeDesc}>
        <section className={styles.dateTime}></section>

        <section className={styles.description}></section>
      </div>

      <div className={styles.mapDetails}>
        <section className={styles.map}>
          <Image src={map} alt='Itinerary map' />
        </section>

        <section className={styles.details}></section>
      </div>
    </div>
  );
};

export default ServiceDetailsStep;
