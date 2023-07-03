import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const response = await axios.get('http://localhost:7000/todos');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
});

// Async thunk for creating a todo
export const createTodo = createAsyncThunk('todos/createTodo', async (newTodo) => {
  try {
    const response = await axios.post('http://localhost:7000/todos', {
      todo: newTodo,
      completed: false,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
});

// Async thunk for updating a todo
export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ index, updatedTodo }) => {
    try {
      await axios.put(`http://localhost:7000/todos/${index}`, {
        todo: updatedTodo,
      });
      return { index, updatedTodo };
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }
);

// Async thunk for deleting a todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (index) => {
  try {
    await axios.delete(`http://localhost:7000/todos/${index}`);
    return index;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
});

// Async thunk for toggling the completion status of a todo
export const toggleComplete = createAsyncThunk(
  'todos/toggleComplete',
  async ({ index, completed }) => {
    try {
      await axios.put(`http://localhost:7000/todos/${index}`, { completed });
      return { index, completed };
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }
);

// Create todoSlice
const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch todos
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.todos = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // Create todo
    builder.addCase(createTodo.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.todos.push(action.payload);
    });
    builder.addCase(createTodo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // Update todo
    builder.addCase(updateTodo.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const { index, updatedTodo } = action.payload;
      state.todos[index].todo = updatedTodo;
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // Delete todo
    builder.addCase(deleteTodo.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const index = action.payload;
      state.todos.splice(index, 1);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    // Toggle complete
    builder.addCase(toggleComplete.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(toggleComplete.fulfilled, (state, action) => {
      state.status = 'succeeded';
      const { index, completed } = action.payload;
      state.todos[index].completed = completed;
    });
    builder.addCase(toggleComplete.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

// Export actions and selectors
export const {
  selectTodos,
  selectTodoStatus,
  selectTodoError,
} = todoSlice.actions;

export default todoSlice.reducer;
