import Image from 'next/image';
import { AiOutlineCloseCircle, AiOutlineEdit } from 'react-icons/ai';
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from 'react-icons/bs';

import { pickup, cargoVan, boxTruck } from '@/public/images';
import { MapContainer } from '@/components';
import { getCardImgSrc } from '@/lib';
import styles from './styles.module.scss';

const getVehicleImage = vehicle => {
  switch (vehicle) {
    case 'Pickup truck':
      return pickup;
    case 'Medium size van':
      return cargoVan;
    case 'Large van':
      return boxTruck;
    default:
      return cargoVan;
  }
};

const MyMove = ({ selectedMove, cancelMove }) => {
  const pickupAddress = selectedMove.addresses.pickup.place_name.split(',');
  const dropOffAddress = selectedMove.addresses.dropOff.place_name.split(',');

  const editMove = () => {
    const phoneNumber = '510-646-7743';
    window.location.href = 'tel:' + phoneNumber;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.vehicleDateTime}>
          <Image src={getVehicleImage()} alt='moving truck' priority />

          <section className={styles.dateTime}>
            <h3>{selectedMove.movingDate}</h3>
            <p>Between {selectedMove.movingWindow}</p>
          </section>
        </div>

        <div className={styles.buttons}>
          <button onClick={cancelMove}>
            <AiOutlineCloseCircle />
            Cancel
          </button>

          <button onClick={editMove}>
            <AiOutlineEdit />
            Edit
          </button>
        </div>
      </div>

      <div className={styles.map}>
        <MapContainer
          orderId={selectedMove.id}
          addresses={selectedMove.addresses}
          height='300px'
          radius='0.75rem'
        />
      </div>

      <div className={styles.details}>
        <div className={styles.addresses}>
          <div className={styles.address}>
            <BsFillArrowUpCircleFill color='green' />

            <section>
              <h4>Pickup address:</h4>
              <p>
                {pickupAddress[0]}, {pickupAddress[1]}
              </p>
            </section>
          </div>

          <div className={styles.address}>
            <BsFillArrowDownCircleFill color='red' />

            <section>
              <h4>Drop-off address:</h4>
              <p>
                {dropOffAddress[0]}, {dropOffAddress[1]}
              </p>
            </section>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.payment}>
            <section className={styles.price}>
              <h4>Price:</h4>
              <h3>{selectedMove.price}</h3>
            </section>

            <section className={styles.card}>
              <Image
                width={50}
                height={50}
                src={getCardImgSrc(selectedMove.paymentMethod.brand)}
                alt='card payment method'
              />

              <p>
                {selectedMove.paymentMethod.brand.charAt(0).toUpperCase() +
                  selectedMove.paymentMethod.brand.slice(1)}{' '}
                ending in ...
                <span>{selectedMove.paymentMethod.last4}</span>
              </p>
            </section>

            <section className={styles.addContacts}>
              <h4>Additional contacts:</h4>

              {selectedMove.additionalContacts.map((contact, i) => (
                <section key={i}>
                  <p>{contact.name}</p>
                  <span>{contact.phoneNumber}</span>
                </section>
              ))}
            </section>

            <section className={styles.desc}>
              <h4>Description:</h4>

              <p>{selectedMove.description}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMove;
