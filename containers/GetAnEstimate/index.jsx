import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import {
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineLoading3Quarters,
} from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import Autosuggest from 'react-autosuggest';

import {
  updateAddresses,
  goToSpecificEstimateStep,
  updateAddressesTypingValues,
} from '../../reduxSlices/orderSlice';
import { fetchAddressesSuggestions } from '@/lib';
import styles from './styles.module.scss';
import { AddressAutosuggest } from '@/components';

const GetAnEstimate = ({ bgColor = '#f7faff' }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { pickup, dropOff, typingValues } = useSelector(
    state => state.order.addresses
  );
  const [suggestions, setSuggestions] = useState({
    pickup: [],
    dropOff: [],
  });
  const [loading, setLoading] = useState({ pickup: false, dropOff: false });
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

  const handleSubmit = e => {
    e.preventDefault();

    if (!addressesAreValid()) return;

    dispatch(goToSpecificEstimateStep(2));
    router.push('/estimate');
  };

  return (
    <div
      className={styles.containerWrapper}
      style={{ backgroundColor: bgColor }}
    >
      <motion.div
        className={styles.container}
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
      >
        <div className={styles.inputs}>
          <h2>Get an estimate</h2>
          <p className={styles.subtitle}>
            Your items are insured. We work on your schedule and we will arrive
            in as little as 30 minutes.
          </p>

          <form className={styles.addresses} onSubmit={handleSubmit}>
            <section
              className={`${styles.input} ${error.pickup ? styles.error : ''}`}
            >
              <section className={styles.icon}>
                {loading.pickup ? (
                  <AiOutlineLoading3Quarters className={styles.loading} />
                ) : (
                  <AiOutlineArrowUp className={styles.svg} />
                )}
              </section>

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
                className='input'
                renderSuggestionsContainer={({ containerProps, children }) => {
                  return (
                    <div
                      {...containerProps}
                      style={{
                        top: 'calc(100% + 0.2rem)',
                      }}
                    >
                      {children}
                    </div>
                  );
                }}
              />
            </section>

            <section
              className={`${styles.input} ${error.dropOff ? styles.error : ''}`}
            >
              <section className={styles.icon}>
                {loading.dropOff ? (
                  <AiOutlineLoading3Quarters className={styles.loading} />
                ) : (
                  <AiOutlineArrowDown className={styles.svg} />
                )}
              </section>

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
                className='input'
                renderSuggestionsContainer={({ containerProps, children }) => {
                  return (
                    <div
                      {...containerProps}
                      style={{
                        top: 'calc(100% + 0.2rem)',
                      }}
                    >
                      {children}
                    </div>
                  );
                }}
              />
            </section>

            <motion.button
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
              type='submit'
            >
              Get an estimate
            </motion.button>
          </form>
        </div>

        <div className={styles.bgImg} />
      </motion.div>
    </div>
  );
};

export default GetAnEstimate;
