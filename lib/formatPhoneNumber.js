const formatPhoneNumber = (phoneNumber = '+xxxxxxxxxxx') => {
  // Remove any non-digit characters from the phone number
  const digitsOnly = phoneNumber.replace(/\D/g, '');

  // Extract the area code and the remaining digits
  const areaCode = digitsOnly.slice(1, 4);
  const firstPart = digitsOnly.slice(4, 7);
  const secondPart = digitsOnly.slice(7);

  // Format the phone number in the desired format
  const formattedNumber = `(${areaCode}) ${firstPart}-${secondPart}`;

  return formattedNumber;
};

export default formatPhoneNumber;
