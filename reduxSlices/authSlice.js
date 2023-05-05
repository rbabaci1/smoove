import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setUser, setLoading, setError } = authSlice.actions;

export const login = (email, password) => async dispatch => {
  try {
    dispatch(setLoading(true));
    // Code for signing in user with email and password here
    dispatch(setUser(userCredential.user));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error));
    dispatch(setLoading(false));
  }
};

export const logout = () => async dispatch => {
  try {
    // Code for signing out user here
    dispatch(setUser(null));
  } catch (error) {
    console.error(error);
  }
};

export const selectUser = state => state.auth.user;

export default authSlice.reducer;
