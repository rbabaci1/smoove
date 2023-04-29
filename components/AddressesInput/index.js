import { useState } from 'react';
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
} from '../../reduxSlices/orderSlice';
import { fetchAddressesSuggestions } from '@/lib';
import { AddressAutosuggest } from '@/components';
import styles from './styles.module.scss';

const AddressesInput = ({
  buttonText = 'Get an estimate',
  animate = false,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pickup, dropOff, typingValues } = useSelector(
    state => state.order.addresses
  );
  const [loading, setLoading] = useState({ pickup: false, dropOff: false });
  const [suggestions, setSuggestions] = useState({
    pickup: [],
    dropOff: [],
  });
  const [error, setError] = useState({ pickup: '', dropOff: '' });

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
      setLoading
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

  const handleSubmit = event => {
    event.preventDefault();

    // verify that entered a valid pickup and dropOff address
    if (!pickup) {
      setError({ ...error, pickup: 'Please enter a valid pickup address' });
      return;
    }
    if (!dropOff) {
      setError({ ...error, dropOff: 'Please enter a valid dropOff address' });
      return;
    }

    dispatch(goToSpecificEstimateStep(2));

    // only push to /estimate if we're on the homepage
    router.asPath === '/' && router.push('/estimate');
  };

  return (
    <motion.div
      className={styles.container}
      initial={animate ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <form className={styles.addresses} onSubmit={handleSubmit}>
        <section className={styles.pickup}>
          {loading.pickup ? (
            <AiOutlineLoading3Quarters className={styles.loading} />
          ) : (
            <AiOutlineArrowUp />
          )}

          <div className={styles.input}>
            <p className={error.pickup ? styles.error : ''}>Pickup address</p>

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
        </section>

        <section className={styles.dropOff}>
          {loading.dropOff ? (
            <AiOutlineLoading3Quarters className={styles.loading} />
          ) : (
            <AiOutlineArrowDown />
          )}

          <div className={styles.input}>
            <p className={error.dropOff ? styles.error : ''}>DropOff address</p>

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
        </section>

        <button type='submit'>{buttonText}</button>
      </form>
    </motion.div>
  );
};

export default AddressesInput;
