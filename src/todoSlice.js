// todoSlice.js

import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      return action.payload;
    },
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    updateTodoAction: (state, action) => {
      const { index, todo, priority } = action.payload;
      state[index].todo = todo;
      state[index].priority = priority;
    },
    deleteTodoAction: (state, action) => {
      const index = action.payload;
      state.splice(index, 1);
    },
    toggleCompleteAction: (state, action) => {
      const { index, completed } = action.payload;
      state[index].completed = completed;
    },
  },
});

export const {
  setTodos,
  addTodo,
  updateTodoAction,
  deleteTodoAction,
  toggleCompleteAction,
} = todoSlice.actions;

export const fetchTodos = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:7000/todos');
    dispatch(setTodos(response.data));
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};

export const createTodo = (newTodo) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:7000/todos', newTodo);
    dispatch(addTodo(response.data));
  } catch (error) {
    console.error('Error creating todo:', error);
  }
};

export const updateTodo = (updatedTodo) => async (dispatch) => {
  try {
    const { index, todo, priority } = updatedTodo;
    await axios.put(`http://localhost:7000/todos/${index}`, {
      todo,
      priority,
    });
    dispatch(updateTodoAction(updatedTodo));
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};

export const deleteTodo = (index) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:7000/todos/${index}`);
    dispatch(deleteTodoAction(index));
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

export const toggleComplete = (updatedTodo) => async (dispatch) => {
  try {
    const { index, completed } = updatedTodo;
    await axios.put(`http://localhost:7000/todos/${index}`, {
      completed,
    });
    dispatch(toggleCompleteAction(updatedTodo));
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};

export default todoSlice.reducer;
