import Image from 'next/image';

import { avatar1, avatar2, avatar3, avatar4 } from '/public/images';
import styles from './styles.module.scss';
import { Review } from '@/components';

const reviews = [
  {
    name: 'Alice Smith',
    location: 'Oakland, CA',
    desc: 'I recently used Smoove, a moving company with a fully online booking system. They charged me based on the minutes spent during the move and the miles driven from pickup to destination. The service was prompt and professional. Highly recommend!',
  },
  {
    name: 'Bob Johnson',
    location: 'San Francisco, CA',
    desc: 'I had a great experience with Smoove, the online moving company. Their pricing based on minutes and miles made it easy to budget for my move. The team was efficient and friendly. I would use them again!',
  },
  {
    name: 'Charlie Brown',
    location: 'San Jose, CA',
    desc: 'Smoove was excellent for my recent move. Their online booking system was convenient and their pricing structure based on minutes and miles was transparent. The movers were skilled and handled my belongings with care.',
  },
  {
    name: 'David Lee',
    location: 'Sacramento, CA',
    desc: 'I highly recommend Smoove for anyone moving in Northern California. Their fully online booking system made scheduling my move a breeze. The movers arrived on time, worked quickly, and the pricing based on minutes and miles was fair.',
  },
  {
    name: 'Eve Chen',
    location: 'Berkeley, CA',
    desc: 'I used Smoove for my recent move and was impressed with their online booking system. The movers were friendly and efficient, and I appreciated their pricing structure based on minutes and miles. Overall, a smooth and hassle-free experience.',
  },
  {
    name: 'Frank Gonzalez',
    location: 'Fremont, CA',
    desc: 'Smoove provided a great moving experience with their online booking system and transparent pricing. The team arrived on time, packed my belongings carefully, and delivered them to my new location without any issues. I would use them again.',
  },
  {
    name: 'Grace Lopez',
    location: 'Palo Alto, CA',
    desc: 'I had a positive experience with Smoove for my recent move. Their online booking system was user-friendly and their pricing based on minutes and miles was reasonable. The movers were professional and handled my move with care.',
  },
  {
    name: 'Hank Wang',
    location: 'Santa Clara, CA',
    desc: 'Smoove made my move easy and convenient with their online booking system. The movers were punctual, friendly, and efficient. The pricing based on minutes and miles was transparent, and I would use them again for my future moves.',
  },
  {
    name: 'Ivy Kim',
    location: 'Hayward, CA',
    desc: 'I had a smooth experience with Smoove for my recent move. Their online booking system was straightforward, and their pricing based on minutes and miles was affordable. The movers were professional and took good care of my belongings.',
  },
  {
    name: 'Jack Nguyen',
    location: 'Sunnyvale, CA',
    desc: 'Smoove was reliable and efficient for my move. Their online booking system was easy to use, and their pricing based on minutes and miles was competitive. The movers were skilled and completed my move without any issues.',
  },
];

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

      <section className={styles.reviews}>
        {reviews.map((review, index) => (
          <Review key={index} {...review} />
        ))}
      </section>

      <section className={styles.reviews}>
        {reviews.reverse().map((review, index) => (
          <Review key={index} {...review} />
        ))}
      </section>

      <section className={styles.reviews}>
        {reviews.map((review, index) => (
          <Review key={index} {...review} />
        ))}
      </section>
    </div>
  );
};

export default Reviews;
