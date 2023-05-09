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

    const { longitude, latitude } = userLocation;

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?proximity=${longitude},${latitude}&bbox=-124.482003,32.528832,-114.131211,42.009516&limit=5&types=address,poi,place&country=us&state=ca&access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setSuggestions({ ...suggestions, [addressType]: data.features });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading({ ...loading, [addressType]: false });
    }
  }
};

export default fetchAddressesSuggestions;
