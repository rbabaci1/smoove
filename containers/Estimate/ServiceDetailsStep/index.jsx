import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
import {
  BsArrowUpSquare,
  BsArrowDownSquare,
  BsCalendarCheck,
  BsTruck,
} from 'react-icons/bs';
import { motion } from 'framer-motion';

import { map } from '@/public/images';
import styles from './styles.module.scss';
import {
  goToSpecificEstimateStep,
  setMovingWindow,
} from '@/reduxSlices/orderSlice';
import { DatePicker } from '@/components';
import { useEffect } from 'react';

const movingWindows = [
  '7am - 8am',
  '8am - 9am',
  '9am - 10am',
  '10am - 11am',
  '11am - 12pm',
  '12pm - 1pm',
  '1pm - 2pm',
  '2pm - 3pm',
  '3pm - 4pm',
  '4pm - 5pm',
  '5pm - 6pm',
  '6pm - 7pm',
  '7pm - 8pm',
  '8pm - 9pm',
  '9pm - 10pm',
];

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
  const dispatch = useDispatch();
  const {
    addresses,
    movingDate,
    movingWindow,
    price,
    vehicleType,
    estimateStep,
  } = useSelector(state => state.order);

  useEffect(() => {
    dispatch(setMovingWindow(movingWindows[0]));
  }, [dispatch]);

  const selectWindow = window => {
    dispatch(setMovingWindow(window));
  };

  return (
    <div className={styles.container}>
      {/* Left side first container */}
      <div>
        {estimateStep === 4 && (
          <motion.div
            className={styles.dateTimeMovWinds}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <section className={styles.date}>
              <DatePicker />
            </section>

            <div className={styles.movingWindows}>
              <h3>When should we arrive at your pickup location?</h3>
              <span>
                {`This is the movers's arrival time, not the
            duration of the move.`}
              </span>

              <div className={styles.movingWindowsList}>
                {movingWindows.map((window, index) => (
                  <span
                    key={index}
                    className={`${
                      movingWindow === window ? styles.movingWindowSelected : ''
                    }`}
                    onClick={() => selectWindow(window)}
                  >
                    {window}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {estimateStep === 5 && (
          <motion.div
            className={styles.descContact}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h3>I need description</h3>
          </motion.div>
        )}
      </div>

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
