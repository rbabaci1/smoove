const parseAddress = address => {
  const { place_name, place_type } = address;
  const splitAddress = place_name.split(',');

  return place_type[0] === 'address'
    ? `${splitAddress[0]}, ${splitAddress[1]}`
    : `${splitAddress[0]}, ${splitAddress[2]}`;
};

export default parseAddress;
