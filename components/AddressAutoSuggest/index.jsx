import Autosuggest from 'react-autosuggest';
import { useDispatch } from 'react-redux';

import { updateAddresses } from '@/state/reduxSlices/orderSlice';

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
  className = '',
  renderSuggestionsContainer,
}) => {
  const dispatch = useDispatch();

  const handleSuggestionSelected = (_, { suggestionValue }) => {
    const splitAddress = suggestionValue?.place_name.split(',');

    dispatch(updateAddresses({ type: addressType, address: suggestionValue }));
    dispatch(
      updateAddressesTypingValues({ type: addressType, value: splitAddress[0] })
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
        placeholder: `${
          addressType === 'pickup' ? 'Pickup' : 'DropOff'
        } address`,
        autoComplete: 'off',
        className,
        name: addressType,
        value: typingValues[addressType],
        onChange: handleChange,
        required: true,
      }}
      onSuggestionSelected={handleSuggestionSelected}
      renderSuggestionsContainer={renderSuggestionsContainer}
    />
  );
};

export default AddressAutosuggest;
