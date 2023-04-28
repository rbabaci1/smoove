import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { CiLocationOn } from 'react-icons/ci';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Autosuggest from 'react-autosuggest';

import {
  updateAddresses,
  goToSpecificEstimateStep,
} from '../../reduxSlices/orderSlice';
import { fetchAddressesSuggestions } from '@/lib';
import styles from './styles.module.scss';

const AddressesInput = ({
  buttonText = 'Get an estimate',
  animate = false,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [suggestions, setSuggestions] = useState({
    pickup: [],
    dropOff: [],
  });
  // typing state
  const [addresses, setAddresses] = useState({ pickup: '', dropOff: '' });

  const handleChange = ({ target: { name, value } }) => {
    setAddresses({ ...addresses, [name]: value });
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions({ pickup: [], dropOff: [] });
  };

  const getSuggestionValue = suggestion => suggestion;

  const renderSuggestion = suggestion => {
    const splitAddress = suggestion?.place_name.split(',');
    const placeType = suggestion?.place_type[0];

    return placeType === 'address' ? (
      <>
        <CiLocationOn />

        <section>
          <p>{splitAddress[0]}</p>
          <span>{splitAddress[1]}</span>
        </section>
      </>
    ) : (
      <>
        <CiLocationOn />

        <section>
          <p>{splitAddress[0]}</p>
          <span>
            {splitAddress[1]}, {splitAddress[2]}
          </span>
        </section>
      </>
    );
  };

  const handleSubmit = event => {
    event.preventDefault();
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
          <AiOutlineArrowUp />

          <div className={styles.input}>
            <p>Pickup address</p>

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
                placeholder: 'Enter pickup',
                autoComplete: 'Pickup address',
                name: 'pickup',
                value: addresses.pickup,
                onChange: handleChange,
                required: true,
              }}
              onSuggestionSelected={(_, { suggestionValue }) => {
                const splitAddress = suggestionValue?.place_name.split(',');

                dispatch(
                  updateAddresses({ type: 'pickup', address: suggestionValue })
                );

                setAddresses({
                  ...addresses,
                  pickup: splitAddress[0] + ',' + splitAddress[1],
                });
              }}
            />
          </div>
        </section>

        <section className={styles.dropOff}>
          <AiOutlineArrowDown />

          <div className={styles.input}>
            <p>DropOff address</p>
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
                placeholder: 'Enter destination',
                autoComplete: 'DropOff address',
                name: 'dropOff',
                value: addresses.dropOff,
                onChange: handleChange,
                required: true,
              }}
              onSuggestionSelected={(_, { suggestionValue }) => {
                const splitAddress = suggestionValue?.place_name.split(',');

                dispatch(
                  updateAddresses({ type: 'dropOff', address: suggestionValue })
                );

                setAddresses({
                  ...addresses,
                  dropOff: splitAddress[0] + ', ' + splitAddress[1],
                });
              }}
            />
          </div>
        </section>

        <button type='submit'>{buttonText}</button>
      </form>
    </motion.div>
  );
};

export default AddressesInput;
