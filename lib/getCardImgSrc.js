const { visa, amex, mastercard, discover } = require('@/public/images');

const getCardImgSrc = brand =>
  brand === 'visa'
    ? visa
    : brand === 'amex'
    ? amex
    : brand === 'mastercard'
    ? mastercard
    : discover;

export default getCardImgSrc;
