import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { FcHome, FcShop } from 'react-icons/fc';
import { useDispatch } from 'react-redux';

import { updateServiceType } from '@/state/reduxSlices/orderSlice';
import styles from './styles.module.scss';

const Dropdown = ({ mobile = false }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const selectServiceType = service => {
    dispatch(updateServiceType(service));
  };

  return (
    <div
      className={styles.container}
      onClick={() => {
        if (mobile) {
          setOpen(!open);
        }
      }}
    >
      <a>Services {open ? <AiOutlineUp /> : <AiOutlineDown />}</a>

      {mobile ? (
        open && (
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
          </div>
        )
      ) : (
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
        </div>
      )}
    </div>
  );
};

export default Dropdown;
