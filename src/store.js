// store.js
import { configureStore } from '@reduxjs/toolkit';
import { loginStart,loginSuccess,loginFailure } from './loginSlice';
import {
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setConfirmPassword,
    setRegistrationError,
    setRegistrationPending,
    resetRegistration,
  } from './registrationSlice';
import {
  selectTodos,
  selectTodoStatus,
  selectTodoError,
} from './todoSlice';



const store = configureStore({
  reducer: {
   login: loginStart,
   login: loginSuccess,
   login:loginFailure,
   registration:setFirstName,
   registration:setLastName,
   registration:setPassword,
   registration:setEmail,
   registration:setConfirmPassword,
   registration:setRegistrationError,
   registration:setRegistrationPending,
   registration:resetRegistration,
   todos:selectTodos,
   todos:selectTodoStatus,
   todos:selectTodoError,
 

 
    // Add more reducers here if needed
  },
});

export default store;
