import Image from 'next/image';

import { avatar1, avatar2, avatar3, avatar4 } from '/public/images';
import styles from './styles.module.scss';
import { Review } from '@/components';

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

      <div className={styles.reviews}>
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
      </div>

      <div className={styles.reviews}>
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
      </div>

      <div className={styles.reviews}>
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
        <Review
          desc='Very professional and communicative. Both were easy to work with and made the move much less stressful.'
          name='Rabah Babaci'
          location='Oakland, CA'
        />
      </div>
    </div>
  );
};

export default Reviews;
