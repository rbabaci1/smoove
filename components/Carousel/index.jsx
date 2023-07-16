import Image from 'next/image';
import { Carousel as ImagesCarousel } from 'antd';

import { fam1, loading, truck, rabah } from '/public/images';
import styles from './styles.module.scss';

const Carousel = () => {
  return (
    <ImagesCarousel
      // autoplay
      autoplaySpeed={10000}
      dots={false}
      className={styles.carousel}
    >
      <div className={styles.item}>
        <Image
          src={truck}
          alt='happy family moved in'
          loading='eager'
          priority
        />
      </div>

      <div className={styles.item}>
        <Image
          src={loading}
          width='auto'
          height='auto'
          alt='happy family unpacking after moving'
        />
      </div>

      <div className={styles.item}>
        <Image
          src={rabah}
          width='auto'
          height='auto'
          alt='company moving truck'
        />
      </div>

      <div className={styles.item}>
        <Image
          src={fam1}
          width='auto'
          height='auto'
          alt='movers loading truck'
        />
      </div>
    </ImagesCarousel>
  );
};

export default Carousel;
