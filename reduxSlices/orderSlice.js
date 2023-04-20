import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: {
    pickup: '',
    dropOff: '',
  },
  serviceType: '',
  vehicleType: '',
  movingDate: 'Today',
  availableMovingWindows: [],
  movingWindow: '',
  description: '',
  additionalContacts: [],
  estimateStep: 1,
  prices: {
    Pickup: '$40 + $0.95 per labor min',
    Van: '$90 + $2.00 per labor min',
    XL: '$140 + $2.10 per labor min',
  },
  skipStepTwo: false,
};

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateAddresses: (state, action) => {
      state.addresses = {
        ...state.addresses,
        [action.payload.type]: action.payload.address,
      };
    },
    updateServiceType: (state, action) => {
      state.serviceType = action.payload;
    },
    updateVehicleType: (state, action) => {
      state.vehicleType = action.payload;
    },
    updateMovingDate: (state, action) => {
      state.movingDate = action.payload;
    },
    updateAvailableMovingWindows: (state, action) => {
      state.availableMovingWindows = action.payload;
    },
    updateMovingWindow: (state, action) => {
      state.movingWindow = action.payload;
    },
    updateDescription: (state, action) => {
      state.description = action.payload;
    },
    addAdditionalContact: (state, action) => {
      state.additionalContacts = [...state.additionalContacts, action.payload];
    },
    enableSkipStepTwo: (state, action) => {
      state.skipStepTwo = true;
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
  },
});

export const {
  updateAddresses,
  updateServiceType,
  updateVehicleType,
  updateDescription,
  updateMovingDate,
  updateMovingWindow,
  updateAvailableMovingWindows,
  addAdditionalContact,
  enableSkipStepTwo,
  goToNextEstimateStep,
  goToPreviousEstimateStep,
  goToSpecificEstimateStep,
} = OrderSlice.actions;

export default OrderSlice.reducer;
