import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  // set default user location to San Francisco Bay Area
  userLocation: {
    longitude: -122.4194,
    latitude: 37.7749,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
  },
});

export const { setUser, setUserLocation } = authSlice.actions;

export default authSlice.reducer;
