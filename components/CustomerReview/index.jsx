import { BsStarFill, BsStarHalf } from 'react-icons/bs';
import styles from './styles.module.scss';
import { useEffect } from 'react';

const CustomerReview = ({ name = 'S', location = 'CA', desc = ' ' }) => {
  // Generate a random number between 0 and 1
  const random = Math.random();
  const stars = Array(5).fill(null);

  let numStars = 5;
  // Create an array of stars

  useEffect(() => {
    // Conditionally determine the number of stars to display
    numStars = random < 0.15 ? 4 : 5;

    // Generate random hue values for each item
    const items = document.querySelectorAll('.random-color-item');
    items.forEach(item => {
      const randomHue = Math.random() * 360;
      item.style.setProperty('--hue', `${randomHue}`);
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.rating}>
        <div className={styles.stars}>
          {stars.map((_, index) =>
            numStars === 5 || index < 4 ? (
              <BsStarFill size={16} key={index} color='gold' />
            ) : (
              <BsStarHalf size={16} key={index} color='gold' />
            )
          )}
        </div>

        <span className={styles.ratingValue}>
          {numStars === 5 ? `${numStars}.0` : `${numStars}`}
        </span>
      </div>

      <p className={styles.desc}>{desc}</p>

      <div className={styles.details}>
        <span className={`${styles.name} random-color-item`}>{name[0]}</span>
        <span className={styles.location}>in {location}</span>
      </div>
    </div>
  );
};

export default CustomerReview;
