import { configureStore, combineReducers } from '@reduxjs/toolkit';
<<<<<<< HEAD:src/redux/store.js
import loginReducer, { loginStart, loginSuccess, loginFailure } from '../components/Login/loginSlice';
import registrationReducer, {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setRegistrationError,
  setRegistrationPending,
  resetRegistration,
} from '../components/Registration/registrationSlice';
import todoReducer, {
  setTodos,
  addTodo,
  updateTodoAction,
  deleteTodoAction,
  toggleCompleteAction,
} from '../components/Todo/todoSlice';
=======
import loginReducer from './loginSlice';
import registrationReducer from './registrationSlice';
import todoReducer from './todoSlice';
>>>>>>> 692b7126e77395b08819ca068db207fd40402cd0:src/store.js

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
