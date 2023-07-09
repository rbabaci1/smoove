import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
import Image from 'next/image';
import {
  BsArrowUpSquare,
  BsArrowDownSquare,
  BsTruck,
  BsCalendarCheck,
  BsCreditCard2Front,
} from 'react-icons/bs';
import { MdOutlineDescription } from 'react-icons/md';
import { IoIosContacts } from 'react-icons/io';
import './styles.module.scss';

import { goToSpecificEstimateStep } from '@/state/reduxSlices/orderSlice';
import { MapContainer } from '@/components';
import { getCardImgSrc, parseAddress } from '@/lib';
import styles from './styles.module.scss';

const EditIcon = ({ step = 1 }) => {
  const dispatch = useDispatch();

  return (
    <AiOutlineEdit
      className={styles.editIcon}
      onClick={() => dispatch(goToSpecificEstimateStep(step))}
    />
  );
};

const FinalStep = () => {
  const {
    addresses: { pickup, dropOff },
    movingDate,
    movingWindow,
    price,
    vehicleType,
    description,
    additionalContacts,
    paymentMethod,
  } = useSelector(state => state.order);

  return (
    <div className={styles.container}>
      <div className={styles.mapDetails}>
        <MapContainer height='300px' />

        <div className={styles.details}>
          <div className={styles.addresses}>
            <section className={styles.pickup}>
              <BsArrowUpSquare className={styles.dataIcon} />

              <section className={styles.address}>
                <span>Pickup address:</span>
                <p>{parseAddress(pickup)}</p>
              </section>

              <EditIcon />
            </section>

            <section className={styles.dropOff}>
              <BsArrowDownSquare className={styles.dataIcon} />

              <section className={styles.address}>
                <span>DropOff address:</span>
                <p>{parseAddress(dropOff)}</p>
              </section>

              <EditIcon />
            </section>
          </div>

          <div className={styles.desc}>
            <MdOutlineDescription className={styles.dataIcon} />

            <section className={styles.text}>
              <span>Description:</span>
              <p>{description}</p>
            </section>

            <EditIcon step={4} />
          </div>

          <div className={styles.addContacts}>
            <IoIosContacts className={styles.dataIcon} />

            <section className={styles.contacts}>
              {additionalContacts.map((contact, index) => {
                return (
                  <div key={index} className={styles.contact}>
                    <p>
                      {contact.name} <span>{contact.phoneNumber}</span>
                    </p>
                  </div>
                );
              })}
            </section>

            <EditIcon step={4} />
          </div>

          <div className={styles.vehicleType}>
            <BsTruck className={styles.dataIcon} />

            <section className={styles.vehicle}>
              <span>Vehicle type:</span>
              <p>{vehicleType}</p>
            </section>

            <EditIcon step={3} />
          </div>

          <div className={styles.dateTime}>
            <BsCalendarCheck className={styles.dataIcon} />

            <section className={styles.info}>
              <h3>{movingDate}</h3>
              <p>{movingWindow}</p>
            </section>

            <EditIcon step={4} />
          </div>

          <div className={styles.paymentMethod}>
            <BsCreditCard2Front className={styles.dataIcon} />

            <div className={styles.info}>
              <h3>Payment method</h3>

              <section className={styles.card}>
                <Image
                  src={getCardImgSrc(paymentMethod.brand)}
                  width={40}
                  height={40}
                  alt='payment method card'
                />

                <p>
                  {paymentMethod.brand.charAt(0).toUpperCase() +
                    paymentMethod.brand.slice(1)}{' '}
                  ending in
                  <span>...{paymentMethod.last4}</span>
                </p>
              </section>
            </div>

            <EditIcon step={8} />
          </div>

          <div className={styles.price}>
            <p>Price:</p>
            <h3>{price}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalStep;
