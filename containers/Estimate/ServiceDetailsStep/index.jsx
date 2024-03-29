import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import PhoneInput, { isPossiblePhoneNumber } from 'react-phone-number-input';
import {
  AiOutlineEdit,
  AiOutlineCloseSquare,
  AiFillCloseCircle,
} from 'react-icons/ai';
import {
  BsArrowUpSquare,
  BsArrowDownSquare,
  BsCalendarCheck,
  BsTruck,
} from 'react-icons/bs';

import { parseAddress, getAvailableMovingWindows } from '@/lib';
import { DatePicker, MapContainer } from '@/components';
import {
  goToSpecificEstimateStep,
  setMovingWindow,
  setDescription,
  updateAdditionalContacts,
} from '@/state/reduxSlices/orderSlice';
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

const ServiceDetailsStep = ({ showMoreInfo }) => {
  const dispatch = useDispatch();
  const {
    addresses: { pickup, dropOff },
    movingDate,
    movingWindow,
    price,
    vehicleType,
    description,
    additionalContacts,
  } = useSelector(state => state.order);
  const [availableMovingWindows, setAvailableMovingWindows] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phoneNumber: '' });
  const [showContacts, setShowContacts] = useState(false);

  useEffect(() => {
    setAvailableMovingWindows(getAvailableMovingWindows(movingDate));
  }, [movingDate]);

  useEffect(() => {
    dispatch(setMovingWindow(availableMovingWindows[0]));
  }, [dispatch, availableMovingWindows]);

  const selectWindow = window => {
    dispatch(setMovingWindow(window));
  };

  const handleDescChange = e => {
    dispatch(setDescription(e.target.value));
  };

  const handleContactChange = event => {
    const { name, value } = event.target;

    setNewContact({ ...newContact, [name]: value });
  };

  const isContactValid = () => {
    const { name, phoneNumber } = newContact;

    return isPossiblePhoneNumber(phoneNumber) && name.length > 0 ? true : false;
  };

  const handleAddContact = () => {
    setShowContacts(true);

    if (isContactValid()) {
      dispatch(updateAdditionalContacts([...additionalContacts, newContact]));
      setNewContact({ name: '', phoneNumber: '' });
      setShowContacts(false);
    } else {
      alert('Please enter a valid name and phone number.');
    }
  };

  const handleDeleteContact = index => {
    const updatedContacts = additionalContacts.filter((_, i) => i !== index);
    dispatch(updateAdditionalContacts(updatedContacts));
  };

  return (
    <>
      <div className={styles.container}>
        {/* Left side first container */}

        {!showMoreInfo && (
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
                {availableMovingWindows.length > 0 ? (
                  availableMovingWindows.map((window, index) => (
                    <span
                      key={index}
                      className={`${
                        movingWindow === window
                          ? styles.movingWindowSelected
                          : ''
                      }`}
                      onClick={() => selectWindow(window)}
                    >
                      {window}
                    </span>
                  ))
                ) : (
                  <span className={styles.noAvailableWindows}>
                    No available windows for the selected date.
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {showMoreInfo && (
          <motion.div
            className={styles.descContact}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h3>What are you moving?</h3>

            <textarea
              name='desc'
              id='desc'
              rows='11'
              placeholder='Inform us of what you are moving or any instructions you might
                have.'
              value={description}
              onChange={handleDescChange}
              required
            />

            <div className={styles.addContacts}>
              <div className={styles.header}>
                <section>
                  <h3>Additional contacts</h3>
                  <span>
                    To keep them updated about the status of the move.
                  </span>
                </section>

                <button
                  onClick={
                    showContacts
                      ? handleAddContact
                      : () => setShowContacts(true)
                  }
                >
                  {showContacts ? 'Save' : 'Add contact'}
                </button>
              </div>

              <div className={styles.contacts}>
                <AnimatePresence>
                  {additionalContacts.map((contact, index) => (
                    <motion.section
                      key={index}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -30, opacity: 0 }}
                    >
                      <h4>{contact.name}</h4>
                      <p>{contact.phoneNumber}</p>
                      <AiFillCloseCircle
                        onClick={() => handleDeleteContact(index)}
                      />
                    </motion.section>
                  ))}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {showContacts && (
                  <motion.section
                    className={styles.newContact}
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                  >
                    <input
                      type='text'
                      placeholder='Name'
                      name='name'
                      onChange={handleContactChange}
                      value={newContact.name}
                      className={styles.name}
                    />

                    <PhoneInput
                      placeholder='Phone number'
                      value={newContact.phoneNumber}
                      onChange={value =>
                        handleContactChange({
                          target: {
                            name: 'phoneNumber',
                            value,
                          },
                        })
                      }
                      country='US'
                      defaultCountry='US'
                      limitMaxLength={true}
                      international={false}
                      className={styles.phoneNumber}
                    />

                    <AiOutlineCloseSquare
                      onClick={() => {
                        setShowContacts(false);
                        setNewContact({ name: '', phoneNumber: '' });
                      }}
                    />
                  </motion.section>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Right side container */}
        <div className={styles.mapDetails}>
          <MapContainer addresses={{ pickup, dropOff }} />

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

              <EditIcon step={2} />
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
    </>
  );
};

export default ServiceDetailsStep;
