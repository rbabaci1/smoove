import Image from 'next/image';
import { Carousel as ImagesCarousel } from 'antd';

import { fam1, fam2, loading, truck, rabah } from '/public/images';
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
          src={loading}
          alt='happy family moved in'
          loading='eager'
          priority
        />
      </div>

      <div className={styles.item}>
        <Image
          src={fam2}
          width='auto'
          height='auto'
          loading='eager'
          alt='happy family unpacking after moving'
        />
      </div>

      <div className={styles.item}>
        <Image
          src={rabah}
          width='auto'
          height='auto'
          loading='eager'
          alt='company moving truck'
        />
      </div>

      <div className={styles.item}>
        <Image
          src={truck}
          width='auto'
          height='auto'
          loading='eager'
          alt='movers loading truck'
        />
      </div>

      <div className={styles.item}>
        <Image
          src={fam1}
          width='auto'
          height='auto'
          loading='eager'
          alt='movers loading truck'
        />
      </div>
    </ImagesCarousel>
  );
};

export default Carousel;
