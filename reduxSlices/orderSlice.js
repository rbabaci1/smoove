import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: {
    pickup: '',
    dropOff: '',
  },
  serviceType: '',
  vehicleType: '',
  movingDate: 'Tuesday, April 25th',
  movingWindow: '9AM - 10AM',
  description: '',
  additionalContacts: [],
  estimateStep: 1,
  price: '',
  serviceTypeSelected: false,
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
    addAdditionalContact: (state, action) => {
      state.additionalContacts = [...state.additionalContacts, action.payload];
    },
    enableServiceTypeSelected: state => {
      state.serviceTypeSelected = true;
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
  selectVehicleType,
  setMovingPrice,
  setDescription,
  setMovingDate,
  setMovingWindow,
  addAdditionalContact,
  enableServiceTypeSelected,
  goToNextEstimateStep,
  goToPreviousEstimateStep,
  goToSpecificEstimateStep,
} = OrderSlice.actions;

export default OrderSlice.reducer;
