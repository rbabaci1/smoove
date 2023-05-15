import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import {
  goToSpecificEstimateStep,
  updateAddressesTypingValues,
} from '../../state/reduxSlices/orderSlice';
import { fetchAddressesSuggestions, getUserLocation } from '@/lib';
import { AddressAutosuggest } from '@/components';
import styles from './styles.module.scss';
import { setUserLocation } from '@/state/reduxSlices/authSlice';

const AddressesInput = ({
  buttonText = 'Get an estimate',
  animate = false,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { addresses } = useSelector(state => state.order);
  const { userLocation } = useSelector(state => state.auth);

  const { pickup, dropOff, typingValues } = addresses;
  const [suggestions, setSuggestions] = useState({
    pickup: [],
    dropOff: [],
  });
  const [loading, setLoading] = useState({ pickup: false, dropOff: false });
  const [error, setError] = useState({ pickup: '', dropOff: '' });

  useEffect(() => {
    const getAndSetUserLocation = async () => {
      const userLocation = await getUserLocation();
      dispatch(setUserLocation(userLocation));
    };

    getAndSetUserLocation();
  }, [dispatch]);

  const handleChange = ({ target: { name, value } }) => {
    dispatch(updateAddressesTypingValues({ type: name, value }));
  };

  const onSuggestionsFetchRequested = (value, reason, addressType) => {
    fetchAddressesSuggestions(
      value,
      reason,
      addressType,
      suggestions,
      setSuggestions,
      loading,
      setLoading,
      userLocation
    );
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions({ pickup: [], dropOff: [] });
  };

  const getSuggestionValue = suggestion => suggestion;

  const renderSuggestion = suggestion => {
    const splitAddress = suggestion?.place_name.split(',');
    const placeType = suggestion?.place_type[0];

    return (
      <>
        <CiLocationOn />

        <section>
          <p>{splitAddress[0]}</p>
          <span>
            {placeType === 'address'
              ? splitAddress[1]
              : splitAddress[1] + ', ' + splitAddress[2]}
          </span>
        </section>
      </>
    );
  };

  const addressesAreValid = () => {
    if (!pickup) {
      setError({ ...error, pickup: 'Please enter a valid pickup address' });
      return false;
    }
    if (!dropOff) {
      setError({ ...error, dropOff: 'Please enter a valid dropOff address' });
      return false;
    }
    return true;
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (!addressesAreValid()) return;

    dispatch(goToSpecificEstimateStep(2));

    // only push to /estimate if we're on the homepage
    router.asPath === '/' && router.push('/estimate');
  };

  return (
    <motion.div
      className={styles.container}
      initial={animate ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <form className={styles.addresses} onSubmit={handleSubmit}>
        <div className={styles.pickup}>
          <section className={styles.icon}>
            {loading.pickup ? (
              <AiOutlineLoading3Quarters className='loading' />
            ) : (
              <AiOutlineArrowUp className={styles.svg} />
            )}
          </section>

          <div className={styles.input}>
            <p
              className={`${styles.label} ${error.pickup ? styles.error : ''}`}
            >
              Point A
            </p>

            <AddressAutosuggest
              addressType='pickup'
              suggestions={suggestions.pickup}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              typingValues={{ pickup: typingValues.pickup }}
              handleChange={handleChange}
              updateAddressesTypingValues={updateAddressesTypingValues}
              clearError={() => setError({ ...error, pickup: '' })}
            />
          </div>
        </div>

        <div className={styles.dropOff}>
          <section className={styles.icon}>
            {loading.dropOff ? (
              <AiOutlineLoading3Quarters className='loading' />
            ) : (
              <AiOutlineArrowDown className={styles.svg} />
            )}
          </section>

          <div className={styles.input}>
            <p
              className={`${styles.label} ${error.pickup ? styles.error : ''}`}
            >
              Point B
            </p>

            <AddressAutosuggest
              addressType='dropOff'
              suggestions={suggestions.dropOff}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              typingValues={{ dropOff: typingValues.dropOff }}
              handleChange={handleChange}
              updateAddressesTypingValues={updateAddressesTypingValues}
              clearError={() => setError({ ...error, dropOff: '' })}
            />
          </div>
        </div>

        <button type='submit'>{buttonText}</button>
      </form>
    </motion.div>
  );
};

export default AddressesInput;
