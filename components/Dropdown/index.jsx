import Link from 'next/link';
import { AiOutlineDown } from 'react-icons/ai';
import { FcHome, FcShop, FcFullTrash, FcDonate } from 'react-icons/fc';
import { useDispatch } from 'react-redux';

import {
  updateServiceType,
  setProceedToOptions,
} from '../../reduxSlices/orderSlice';
import styles from './styles.module.scss';

const Dropdown = () => {
  const dispatch = useDispatch();

  const handleServiceType = serviceType => {
    dispatch(updateServiceType(serviceType));
    dispatch(setProceedToOptions(true));
  };

  return (
    <div className={styles.container}>
      <Link href='#'>
        Services <AiOutlineDown />
      </Link>

      <div className={styles.services}>
        <Link
          href='/book/location'
          onClick={() => {
            handleServiceType('Store delivery');
          }}
        >
          <FcHome />
          Regular move
        </Link>

        <Link href='/book/location'>
          <FcShop />
          Store delivery
        </Link>

        <Link href='/book/location'>
          <FcFullTrash />
          Junk removal
        </Link>

        <Link href='/book/location'>
          <FcDonate />
          Donations
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
