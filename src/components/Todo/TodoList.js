import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
} from './todoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');
  const [priority, setPriority] = useState('Low');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      dispatch(
        createTodo({
          todo: newTodo,
          priority: priority,
          completed: false,
        })
      );
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    dispatch(deleteTodo(index));
  };

  const handleEditTodo = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setEditedTodo(todos[index].todo);
    setPriority(todos[index].priority);
  };

  const handleUpdateTodo = () => {
    if (editedTodo.trim() !== '') {
      dispatch(
        updateTodo({
          id: editIndex + 1, // Pass the id, not the index, to the updateTodo function
          todo: editedTodo,
          priority: priority,
        })
      );
      setEditMode(false);
      setEditIndex(null);
      setEditedTodo('');
    }
  };

  const handleToggleComplete = (index) => {
    dispatch(
      toggleComplete({
        id: index + 1, // Pass the id, not the index, to the toggleComplete function
        completed: !todos[index].completed,
      })
    );
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
      default:
        return 'black';
    }
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            {editMode && editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </>
            ) : (
              <>
                <span
                  style={{
                    color: priorityColor(todo.priority),
                    textDecoration: todo.completed ? 'line-through' : 'none',
                  }}
                >
                  {todo.todo}
                </span>
                <span style={{ color: priorityColor(todo.priority) }}>
                  {' '}
                  - {todo.priority}
                </span>
              </>
            )}
            {editMode && editIndex === index ? (
              <button onClick={handleUpdateTodo}>Update</button>
            ) : (
              <button onClick={() => handleEditTodo(index)}>Edit</button>
            )}
            <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            <button onClick={() => handleToggleComplete(index)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
