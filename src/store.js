import { configureStore, combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import registrationReducer from './registrationSlice';
import todoReducer from './todoSlice';

const rootReducer = combineReducers({
  login: loginReducer,
  registration: registrationReducer,
  todos: todoReducer,
  // Add more reducers here if needed
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
