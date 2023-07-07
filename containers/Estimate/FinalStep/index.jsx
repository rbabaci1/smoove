import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
import {
  BsArrowUpSquare,
  BsArrowDownSquare,
  BsTruck,
  BsCalendarCheck,
} from 'react-icons/bs';

import { goToSpecificEstimateStep } from '@/state/reduxSlices/orderSlice';
import { MapContainer } from '@/components';
import { parseAddress } from '@/lib';
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
    estimateStep,
    additionalContacts,
    paymentMethod,
  } = useSelector(state => state.order);

  return (
    <div className={styles.container}>
      <div className={styles.mapDetails}>
        <MapContainer />

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

          <div className={styles.price}>
            <span>Price:</span>

            <h3>{price}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalStep;
