import Image from 'next/image';
import { Carousel as ImagesCarousel } from 'antd';

import { fam1, fam2, loading, truck } from '/public/images';
import styles from './styles.module.scss';

const Carousel = () => {
  return (
    <ImagesCarousel dots={false} className={styles.carousel}>
      <div className={styles.item}>
        <Image src={fam1} alt='happy family moved in' priority />
      </div>

      <div className={styles.item}>
        <Image src={fam2} alt='happy family unpacking after moving' />
      </div>

      <div className={styles.item}>
        <Image src={truck} alt='company moving truck' />
      </div>

      <div className={styles.item}>
        <Image src={loading} alt='movers loading truck' />
      </div>
    </ImagesCarousel>
  );
};

export default Carousel;
