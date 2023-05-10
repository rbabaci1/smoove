import Link from 'next/link';
import { AiOutlineDown } from 'react-icons/ai';
import { FcHome, FcShop, FcFullTrash, FcDonate } from 'react-icons/fc';
import { useDispatch } from 'react-redux';

import { updateServiceType } from '@/state/reduxSlices/orderSlice';
import styles from './styles.module.scss';

const Dropdown = () => {
  const dispatch = useDispatch();

  const selectServiceType = service => {
    dispatch(updateServiceType(service));
  };

  return (
    <div className={styles.container}>
      <a>
        Services <AiOutlineDown />
      </a>

      <div className={styles.services}>
        <Link
          href='/estimate'
          onClick={() => selectServiceType('Regular move')}
        >
          <FcHome />
          Regular move
        </Link>

        <Link
          href='/estimate'
          onClick={() => selectServiceType('Store delivery')}
        >
          <FcShop />
          Store delivery
        </Link>

        <Link href='/estimate' onClick={() => selectServiceType('Dumping')}>
          <FcFullTrash />
          Dumping
        </Link>

        <Link href='/estimate' onClick={() => selectServiceType('Donations')}>
          <FcDonate />
          Donations
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
