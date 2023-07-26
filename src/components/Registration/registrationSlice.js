import { createSlice } from '@reduxjs/toolkit';

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    isPending: false,
  },
  //creating reducers
  reducers: {
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setRegistrationError: (state, action) => {
      state.error = action.payload;
    },
    setRegistrationPending: (state, action) => {
      state.isPending = action.payload;
    },
    resetRegistration: (state) => {
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.password = '';
      state.confirmPassword = '';
      state.error = '';
      state.isPending = false;
    },
  },
});

export const {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setRegistrationError,
  setRegistrationPending,
  resetRegistration,
} = registrationSlice.actions;

export default registrationSlice.reducer;
