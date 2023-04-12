import { avatar1, avatar2, avatar3, avatar4 } from '/public/images';
import styles from './styles.module.scss';
import Image from 'next/image';

const Reviews = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <section className={styles.avatars}>
          <Image src={avatar1} alt='customer avatar' />
          <Image src={avatar2} alt='customer avatar' />
          <Image src={avatar3} alt='customer avatar' />
          <Image src={avatar4} alt='customer avatar' />
        </section>

        <h2>
          Happy <span>customers</span> all around
        </h2>
      </div>
    </div>
  );
};

export default Reviews;
