import Image from 'next/image';
import { Carousel as ImagesCarousel } from 'antd';

import { fam1, fam2, loading, truck } from '/public/images';
import styles from './styles.module.scss';

const Carousel = () => {
  return (
    <ImagesCarousel dots={false} className={styles.carousel}>
      <Image src={fam1} alt='happy family moved in' priority />
      <Image src={fam2} alt='happy family unpacking after moving' />
      <Image src={truck} alt='company moving truck' />
      <Image src={loading} alt='movers loading truck' />
    </ImagesCarousel>
  );
};

export default Carousel;
