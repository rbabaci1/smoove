import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import styles from './styles.module.scss';

const Careers = () => {
  return (
    <div className={styles.containerWrapper}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h2>Start making money now</h2>
          <p>
            Be active, meet new people daily & earn up to <span>$2900</span> a
            week!
          </p>

          <button type='submit'>Get an estimate</button>
        </div>

        <div className={styles.bgImg} />
      </div>
    </div>
  );
};

export default Careers;
