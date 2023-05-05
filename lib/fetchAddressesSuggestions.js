import geocoding from '@mapbox/mapbox-sdk/services/geocoding';

const geocodingClient = geocoding({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
});

const options = {
  countries: ['us'],
  types: ['address', 'poi'],
  limit: 5,
  bbox: [-124.409619, 32.534156, -114.131211, 42.009518],
};

const fetchAddressesSuggestions = async (
  value,
  reason,
  addressType,
  suggestions,
  setSuggestions,
  loading,
  setLoading,
  userLocation
) => {
  if (reason === 'input-changed') {
    setLoading({ ...loading, [addressType]: true });

    geocodingClient
      .forwardGeocode({
        query: value,
        types: ['address', 'place'],
        proximity: userLocation,
        ...options,
      })
      .send()
      .then(response => {
        const results = response.body.features;

        if (addressType === 'pickup') {
          setSuggestions({ ...suggestions, pickup: results });
        } else {
          setSuggestions({ ...suggestions, dropOff: results });
        }

        setLoading({ ...loading, [addressType]: false });
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export default fetchAddressesSuggestions;
