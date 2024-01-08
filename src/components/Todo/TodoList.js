// TodoList.js

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleComplete,
} from "./todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");
  const [priority, setPriority] = useState("Low");

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      dispatch(
        createTodo({
          todo: newTodo,
          priority: priority,
          completed: false,
        })
      );
      setNewTodo("");
      setPriority("Low");
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
    if (editedTodo.trim() !== "") {
      dispatch(
        updateTodo({
          id: editIndex + 1, // Pass the id, not the index, to the updateTodo function
          todo: editedTodo,
          priority: priority,
        })
      );
      setEditMode(false);
      setEditIndex(null);
      setEditedTodo("");
      setPriority("Low");
    }
  };

  const handleToggleComplete = (id) => {
    // Change 'index' to 'id'
    dispatch(
      toggleComplete({
        id: id, // Pass the correct id instead of 'index'
        completed: !todos.find((todo) => todo.id === id).completed,
      })
    );
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      case "Low":
      default:
        return "medium";
    }
  };

  return (
    <div className="todo-list">
      <h1>To do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        style={{
          backgroundColor: "orange",
          border: "none",
          borderRadius: 3,
          height: 30,
          width: 300,
          margin: 10,
          borderRadius: 10,
        }}
      /> 
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{
          backgroundColor: "orange",
          border: "none",
          borderRadius: 3,
          height: 30,
          margin: 10,
          borderRadius: 10,
        }}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button
        onClick={handleAddTodo}
        style={{
          backgroundColor: "orange",
          border: "none",
          borderRadius: 10,
          height: 30,
          margin: 10,
        }}
      >
        Add Todo
      </button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {editMode && editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editedTodo}
                  onChange={(e) => setEditedTodo(e.target.value)}
                  style={{
                    backgroundColor: "orange",
                    border: "none",
                    borderRadius: 3,
                    height: 30,
                    width: 300,
                    margin: 10,
                    borderRadius: 10,
                  }}
                />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  style={{
                    backgroundColor: "orange",
                    border: "none",
                    borderRadius: 3,
                    height: 30,
                    margin: 10,
                    borderRadius: 10,
                  }}
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
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.todo}
                </span>
                <span style={{ color: priorityColor(todo.priority) }}>
                  {" "}
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
            <button onClick={() => handleToggleComplete(todo.id)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
