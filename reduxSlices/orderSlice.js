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
  additionalContact: {
    name: '',
    phoneNumber: '',
  },
  prices: {
    Pickup: '$40 + $0.95 per labor min',
    Van: '$90 + $2.00 per labor min',
    XL: '$140 + $2.10 per labor min',
  },
  proceedToOptions: false,
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
    updateAdditionalContact: (state, action) => {
      state.additionalContact = action.payload;
    },
    setProceedToOptions: (state, action) => {
      state.proceedToOptions = action.payload;
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
  updateAdditionalContact,
  setProceedToOptions,
} = OrderSlice.actions;

export default OrderSlice.reducer;
