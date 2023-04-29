import Autosuggest from 'react-autosuggest';
import { useDispatch } from 'react-redux';

import { updateAddresses } from '@/reduxSlices/orderSlice';

const AddressAutosuggest = ({
  addressType,
  suggestions,
  onSuggestionsFetchRequested,
  getSuggestionValue,
  renderSuggestion,
  onSuggestionsClearRequested,
  typingValues,
  handleChange,
  updateAddressesTypingValues,
  clearError,
}) => {
  const dispatch = useDispatch();

  const handleSuggestionSelected = (_, { suggestionValue }) => {
    const splitAddress = suggestionValue?.place_name.split(',');

    dispatch(updateAddresses({ type: addressType, address: suggestionValue }));

    dispatch(
      updateAddressesTypingValues({
        type: addressType,
        value: splitAddress[0],
      })
    );
    clearError();
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={({ value, reason }) =>
        onSuggestionsFetchRequested(value, reason, addressType)
      }
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={{
        placeholder: `Enter ${
          addressType === 'pickup' ? 'pickup' : 'destination'
        }`,
        autoComplete: 'off',
        name: addressType,
        value: typingValues[addressType],
        onChange: handleChange,
        required: true,
      }}
      onSuggestionSelected={handleSuggestionSelected}
    />
  );
};

export default AddressAutosuggest;
