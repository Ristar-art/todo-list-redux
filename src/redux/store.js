import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
