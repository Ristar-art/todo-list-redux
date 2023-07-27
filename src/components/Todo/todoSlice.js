import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
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
      const { id, todo, priority } = action.payload;
      const todoItem = state.find((item) => item.id === id);
      if (todoItem) {
        todoItem.todo = todo;
        todoItem.priority = priority;
      }
    },
    deleteTodoAction: (state, action) => {
      const idToDelete = action.payload;
      const deletedIndex = state.findIndex((todo) => todo.id === idToDelete);
      if (deletedIndex !== -1) {
        state.splice(deletedIndex, 1);
        // Reassign unique IDs to the todos after deletion
        state.forEach((todo, index) => {
          todo.id = index + 1;
        });
      }
    },
    toggleCompleteAction: (state, action) => {
      const { id, completed } = action.payload;
      const todoItem = state.find((item) => item.id === id);
      if (todoItem) {
        todoItem.completed = completed;
      }
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
    const response = await axios.get('/api/todos');
    dispatch(setTodos(response.data));
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};

export const createTodo = (todo) => async (dispatch) => {
  try {
    const response = await axios.post('/api/todos', todo);
    dispatch(addTodo(response.data));
  } catch (error) {
    console.error('Error creating todo:', error);
  }
};

export const updateTodo = (todo) => async (dispatch) => {
  try {
    const { id, ...todoData } = todo;
    await axios.put(`/api/todos/${id}`, todoData);
    dispatch(updateTodoAction(todo));
  } catch (error) {
    console.error('Error updating todo:', error);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/todos/${id}`);
    dispatch(deleteTodoAction(id));
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

export const toggleComplete = (todo) => async (dispatch) => {
  try {
    const { id, completed } = todo;
    await axios.put(`/api/todos/${id}`, { completed });

    // Instead of dispatching the entire 'todo' object, dispatch only the id and completed status.
    dispatch(toggleCompleteAction({ id, completed }));
  } catch (error) {
    console.error('Error toggling complete:', error);
  }
};


export default todoSlice.reducer;
