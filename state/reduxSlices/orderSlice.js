import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: {
    pickup: null,
    dropOff: null,

    typingValues: {
      pickup: '',
      dropOff: '',
    },
  },
  paymentMethod: null,
  vehicleType: '',
  movingDate: '',
  movingWindow: '',
  description: '',
  additionalContacts: [],
  estimateStep: 1,
  price: '',
  status: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateAddresses: (state, action) => {
      state.addresses = {
        ...state.addresses,
        [action.payload.type]: action.payload.address,
      };
    },
    updateAddressesTypingValues: (state, action) => {
      state.addresses.typingValues = {
        ...state.addresses.typingValues,
        [action.payload.type]: action.payload.value,
      };
    },
    selectVehicleType: (state, action) => {
      state.vehicleType = action.payload;
    },
    setMovingPrice: (state, action) => {
      state.price = action.payload;
    },
    setMovingDate: (state, action) => {
      state.movingDate = action.payload;
    },
    setMovingWindow: (state, action) => {
      state.movingWindow = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    updateAdditionalContacts: (state, action) => {
      state.additionalContacts = action.payload;
    },

    goToNextEstimateStep: state => {
      state.estimateStep += 1;
    },
    goToPreviousEstimateStep: state => {
      state.estimateStep -= 1;
    },

    goToSpecificEstimateStep: (state, action) => {
      state.estimateStep = action.payload;
    },
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    updateOrderStatus: (state, action) => {
      state.status = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    resetOrder: () => initialState,
  },
});

export const {
  updateAddresses,
  updateAddressesTypingValues,
  selectVehicleType,
  setMovingPrice,
  setDescription,
  setMovingDate,
  setMovingWindow,
  updateAdditionalContacts,
  goToNextEstimateStep,
  goToPreviousEstimateStep,
  goToSpecificEstimateStep,
  updateOrderStatus,
  setPaymentMethod,
  resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
