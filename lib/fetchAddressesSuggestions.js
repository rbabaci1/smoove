import geocoding from '@mapbox/mapbox-sdk/services/geocoding';

const geocodingClient = geocoding({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_KEY,
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
  name,
  suggestions,
  setSuggestions
) => {
  if (reason === 'input-changed') {
    try {
      const response = await geocodingClient
        .forwardGeocode({
          query: value,
          types: ['address', 'place'],
          ...options,
        })
        .send();

      const results = response.body.features;

      if (name === 'pickup') {
        setSuggestions({ ...suggestions, pickup: results });
      } else {
        setSuggestions({ ...suggestions, dropOff: results });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export default fetchAddressesSuggestions;
