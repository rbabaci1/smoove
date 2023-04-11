import Link from 'next/link';
import { AiOutlineDown } from 'react-icons/ai';
import { FcHome, FcShop, FcFullTrash, FcDonate } from 'react-icons/fc';

import styles from './styles.module.scss';

const Dropdown = () => {
  return (
    <div className={styles.container}>
      <Link href='#'>
        Services <AiOutlineDown />
      </Link>

      <div className={styles.services}>
        <Link
          href={{
            pathname: '/services',
            query: { type: 'Regular move' },
          }}
        >
          <FcHome />
          Regular move
        </Link>

        <Link
          href={{
            pathname: '/services',
            query: { type: 'Store delivery' },
          }}
        >
          <FcShop />
          Store delivery
        </Link>

        <Link
          href={{
            pathname: '/services',
            query: { type: 'Junk removal' },
          }}
        >
          <FcFullTrash />
          Junk removal
        </Link>

        <Link
          href={{
            pathname: '/services',
            query: { type: 'Donations' },
          }}
        >
          <FcDonate />
          Donations
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
