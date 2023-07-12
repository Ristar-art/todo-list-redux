import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchTodos,
  createTodo,
  deleteTodo,
  updateTodo,
  selectTodos,
} from './todoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const [newTodo, setNewTodo] = useState('');
  const [priority, setPriority] = useState('Low');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState('');

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
      setPriority('Low');
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEditTodo = (id) => {
    setEditMode(true);
    setEditIndex(id);
    const editedTodo = todos.find((todo) => todo.id === id);
    if (editedTodo) {
      setEditedTodo(editedTodo.todo);
      setPriority(editedTodo.priority);
    }
  };

  const handleUpdateTodo = () => {
    if (editedTodo.trim() !== '') {
      dispatch(
        updateTodo({
          id: editIndex,
          updatedTodo: {
            todo: editedTodo,
            priority: priority,
          },
        })
      );
      setEditMode(false);
      setEditIndex(null);
      setEditedTodo('');
      setPriority('Low');
    }
  };

  const handleToggleComplete = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      dispatch(
        updateTodo({
          id: id,
          updatedTodo: {
            ...todoToUpdate,
            completed: !todoToUpdate.completed,
          },
        })
      );
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'red';
      case 'Medium':
        return 'orange';
      case 'Low':
      default:
        return 'medium';
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
        {todos.map((todo) => (
          <li key={todo.id}>
            {editMode && editIndex === todo.id ? (
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
                <button onClick={handleUpdateTodo}>Update</button>
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
                <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </button>
                <button onClick={() => handleToggleComplete(todo.id)}>
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

