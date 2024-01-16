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
  const [time, setTime] = useState("");

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
          time: time,
        })
      );
      setNewTodo("");
      setPriority("Low");
      setTime("");
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
          id: editIndex + 1,
          todo: editedTodo,
          priority: priority,
          time: time,
        })
      );
      setEditMode(false);
      setEditIndex(null);
      setEditedTodo("");
      setPriority("Low");
      setTime("");
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
          color: "white",
          placeholder: "Enter you to do",
        }}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={{
          backgroundColor: "orange",
          border: "none",
          borderRadius: 3,
          height: 30,
          width: 300,
          margin: 10,
          borderRadius: 10,
          color: "white",
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
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
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
              <div
                style={{ height: 50, width: "auto",backgroundColor:'orenge'  }}
              >
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
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  style={{
                    backgroundColor: "orange",
                    border: "none",
                    borderRadius: 3,
                    height: 30,
                    width: 300,
                    margin: 10,
                    borderRadius: 10,
                    color: "white",
                  }}
                />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  style={{
                    //backgroundColor: "orange",
                    border: "none",
                    borderRadius: 3,
                    height: 30,
                    margin: 10,
                    borderRadius: 10,
                  }}
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>
            ) : (
              <div
                style={{
                  height: 40,
                  width: "auto",
                  width: 300,
                  borderRadius: 10,
                  backgroundColor: "orenge",
                  marginLeft: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    color: priorityColor(todo.priority),
                    border: "none",
                    borderRadius: 3,
                    height: 20,
                    margin: 10,
                    borderRadius: 10,
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.todo}
                </span>
                <span
                  style={{
                    color: priorityColor(todo.priority),
                    border: "none",
                    borderRadius: 3,
                    height: 20,
                    margin: 10,
                    borderRadius: 10,
                  }}
                >
                  {todo.time && ` ${todo.time}`}
                </span>
                <span
                  style={{
                    color: priorityColor(todo.priority),
                    border: "none",
                    borderRadius: 3,
                    height: 20,
                    margin: 10,
                    borderRadius: 10,
                  }}
                >
                  {" "}
                  {todo.priority}
                </span>
              </div>
            )}
            {editMode && editIndex === index ? (
              <button
                style={{
                  border: "none",
                  borderRadius: 3,
                  height: 30,
                  margin: 10,
                  borderRadius: 10,
                  backgroundColor: "orange",
                }}
                onClick={handleUpdateTodo}
              >
                Update
              </button>
            ) : (
              <button
                style={{
                  backgroundColor: "orange",
                  border: "none",
                  borderRadius: 3,
                  height: 30,
                  margin: 10,
                  borderRadius: 10,
                }}
                onClick={() => handleEditTodo(index)}
              >
                Edit
              </button>
            )}
            <button
              style={{
                border: "none",
                borderRadius: 3,
                height: 30,
                margin: 10,
                backgroundColor: "red",
                borderRadius: 10,
              }}
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
            <button
              style={{
                backgroundColor: "green",
                border: "none",
                borderRadius: 3,
                height: 30,
                margin: 10,
                borderRadius: 10,
              }}
              onClick={() => handleToggleComplete(todo.id)}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
