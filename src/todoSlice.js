import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const response = await axios.get('http://localhost:7000/todos');
    return response.data;
  } catch (error) {
    throw Error('Error fetching todos');
  }
});

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (newTodo) => {
    try {
      const response = await axios.post('http://localhost:7000/todos', newTodo);
      return response.data;
    } catch (error) {
      throw Error('Error creating todo');
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    try {
      await axios.delete(`http://localhost:7000/todos/${id}`);
      return id;
    } catch (error) {
      throw Error('Error deleting todo');
    }
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, updatedTodo }) => {
    try {
      const response = await axios.put(
        `http://localhost:7000/todos/${id}`,
        updatedTodo
      );
      return response.data;
    } catch (error) {
      throw Error('Error updating todo');
    }
  }
);

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      });
  },
});

export const selectTodos = (state) => state.todos.todos;

export default todoSlice.reducer;
