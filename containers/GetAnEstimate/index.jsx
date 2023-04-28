import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import Autosuggest from 'react-autosuggest';

import {
  updateAddresses,
  goToSpecificEstimateStep,
  updateAddressesTypingValues,
} from '../../reduxSlices/orderSlice';
import { fetchAddressesSuggestions } from '@/lib';
import styles from './styles.module.scss';

const GetAnEstimate = ({ bgColor = '#f7faff' }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { typingValues } = useSelector(state => state.order.addresses);
  const [suggestions, setSuggestions] = useState({
    pickup: [],
    dropOff: [],
  });

  const handleChange = ({ target: { name, value } }) => {
    dispatch(updateAddressesTypingValues({ type: name, value }));
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

  const handleSubmit = e => {
    e.preventDefault();
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
            <section className={styles.input}>
              <AiOutlineArrowUp className={styles.svg} />

              <Autosuggest
                suggestions={suggestions.pickup}
                onSuggestionsFetchRequested={({ value, reason }) =>
                  fetchAddressesSuggestions(
                    value,
                    reason,
                    'pickup',
                    suggestions,
                    setSuggestions
                  )
                }
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                  placeholder: 'Pickup address',
                  autoComplete: 'off',
                  name: 'pickup',
                  className: 'input',
                  value: typingValues.pickup,
                  onChange: handleChange,
                  required: true,
                }}
                onSuggestionSelected={(_, { suggestionValue }) => {
                  const splitAddress = suggestionValue?.place_name.split(',');

                  dispatch(
                    updateAddresses({
                      type: 'pickup',
                      address: suggestionValue,
                    })
                  );
                  dispatch(
                    updateAddressesTypingValues({
                      type: 'pickup',
                      value: splitAddress[0],
                    })
                  );
                }}
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

            <section className={styles.input}>
              <AiOutlineArrowDown className={styles.svg} />

              <Autosuggest
                suggestions={suggestions.dropOff}
                onSuggestionsFetchRequested={({ value, reason }) =>
                  fetchAddressesSuggestions(
                    value,
                    reason,
                    'dropOff',
                    suggestions,
                    setSuggestions
                  )
                }
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{
                  placeholder: 'DropOff address',
                  autoComplete: 'off',
                  name: 'dropOff',
                  className: 'input',
                  value: typingValues.dropOff,
                  onChange: handleChange,
                  required: true,
                }}
                onSuggestionSelected={(_, { suggestionValue }) => {
                  const splitAddress = suggestionValue?.place_name.split(',');

                  dispatch(
                    updateAddresses({
                      type: 'dropOff',
                      address: suggestionValue,
                    })
                  );
                  dispatch(
                    updateAddressesTypingValues({
                      type: 'dropOff',
                      value: splitAddress[0],
                    })
                  );
                }}
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
