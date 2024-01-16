const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(cors()); // Use cors middleware

const dataFilePath = 'db.json';
// Initialize an empty array to store profiles and todos in the data object
let data = {
  profiles: [],
  todos: [],
};

if (fs.existsSync(dataFilePath)) {
  const jsonData = fs.readFileSync(dataFilePath, 'utf8');
  try {
    data = JSON.parse(jsonData);
  } catch (error) {
    console.error('Error parsing data from file:', error);
  }
}

// Endpoint to add a new profile
app.post('/api/profiles', (req, res) => {
  // Get the data from the request body
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  // Generate a unique ID for the new profile
  const id = data.profiles.length + 1;

  // Create a new profile object
  const newProfile = {
    id,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  };

  // Add the new profile to the profiles array in the data object
  data.profiles.push(newProfile);
  console.log(newProfile);

  saveDataToFile(dataFilePath, data);
  // Return the newly created profile as the response
  res.json(newProfile);
});

// Endpoint to retrieve all profiles
app.get('/api/profiles', (req, res) => {
  // Return all profiles as the response
  res.json(data.profiles);
});

// Endpoint to add a new todo
app.post('/api/todos', (req, res) => {
  // Get the todo object from the request body
  const { todo, time, priority } = req.body;

  // Generate a unique ID for the new todo
  const id = data.todos.length + 1;

  // Create a new todo object
  const newTodo = {
    id,
    todo,
    time,
    priority,
    completed: false,
  };

  // Add the new todo to the todos array in the data object
  data.todos.push(newTodo);

  saveDataToFile(dataFilePath, data);
  // Return the newly created todo as the response
  res.json(newTodo);
});

// Endpoint to retrieve all todos
app.get('/api/todos', (req, res) => {
  // Return all todos as the response
  res.json(data.todos);
});

app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { todo, priority, completed } = req.body;

  // Find the index of the todo item with the given id
  const todoIndex = data.todos.findIndex((todoItem) => todoItem.id === Number(id));

  if (todoIndex !== -1) {
    // Update the todo item with the new data
    data.todos[todoIndex].todo = todo;
    //data.todos[todoIndex].time = todo;
    data.todos[todoIndex].priority = priority;
    data.todos[todoIndex].completed = completed;
    saveDataToFile(dataFilePath, data);
    res.json(data.todos[todoIndex]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;

  // Find the index of the todo item with the given id
  const todoIndex = data.todos.findIndex((todoItem) => todoItem.id === Number(id));

  if (todoIndex !== -1) {
    // Remove the todo item from the todos array in the data object
    data.todos.splice(todoIndex, 1);

    // Reassign IDs based on the index in the todos array
    data.todos.forEach((todo, index) => {
      todo.id = index + 1;
    });

    saveDataToFile(dataFilePath, data);
    res.json({ message: 'Todo deleted successfully' });
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

function saveDataToFile(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
}

app.listen(8000, () => console.log('listening on port 8000...'));
