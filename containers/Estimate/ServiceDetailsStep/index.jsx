import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
import {
  BsArrowUpSquare,
  BsArrowDownSquare,
  BsCalendarCheck,
  BsTruck,
} from 'react-icons/bs';

import { map } from '@/public/images';
import styles from './styles.module.scss';
import { goToSpecificEstimateStep } from '@/reduxSlices/orderSlice';

const EditIcon = ({ step = 1 }) => {
  const dispatch = useDispatch();

  return (
    <AiOutlineEdit
      className={styles.editIcon}
      onClick={() => dispatch(goToSpecificEstimateStep(step))}
    />
  );
};

const ServiceDetailsStep = () => {
  const {
    addresses,
    movingDate,
    movingWindow,
    price,
    vehicleType,
    estimateStep,
  } = useSelector(state => state.order);

  return (
    <div className={styles.container}>
      {/* Left side first container */}
      <div className={styles.dateTimeDesc}>
        <div className={styles.dateTime}></div>

        <div className={styles.description}></div>
      </div>

      {/* Left side second container */}
      {estimateStep === 5 && <div className={styles.descContact}></div>}

      {/* Right side container */}
      <div className={styles.mapDetails}>
        <div className={styles.map}>
          <Image src={map} alt='Itinerary map' />
        </div>

        <div className={styles.details}>
          <div className={styles.addresses}>
            <section className={styles.pickup}>
              <BsArrowUpSquare className={styles.dataIcon} />

              <section className={styles.address}>
                <span>Pickup address:</span>
                <p>{addresses?.pickup}</p>
              </section>

              <EditIcon />
            </section>

            <section className={styles.dropOff}>
              <BsArrowDownSquare className={styles.dataIcon} />

              <section className={styles.address}>
                <span>DropOff address:</span>
                <p>{addresses?.dropOff}</p>
              </section>

              <EditIcon />
            </section>
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
          </div>

          <div className={styles.price}>
            <span>Price:</span>

            <h3>{price}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsStep;
