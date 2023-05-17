import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import styles from './styles.module.scss';

const MyMoves = () => {
  const router = useRouter();

  // later fetch from db
  const [moves, setMoves] = useState([]);

  return (
    <div className={styles.container}>
      <h3>My moves</h3>
    </div>
  );
};

export default MyMoves;
