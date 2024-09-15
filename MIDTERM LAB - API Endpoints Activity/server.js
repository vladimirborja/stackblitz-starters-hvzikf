const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const users = [
  { id: 1, name: 'Carmela', email: 'mela@gmail.com', age: 25, salary: 25000 },
  { id: 2, name: 'Joseph', email: 'joe@yahoo.com', age: 30, salary: 45000 },
  { id: 3, name: 'James', email: 'james@msn.com', age: 35, salary: 30000 },
  { id: 4, name: 'John', email: 'john@gmail.com', age: 40, salary: 25000 },
  { id: 5, name: 'Frank', email: 'frank@yahoo.com', age: 45, salary: 45000 },
  { id: 6, name: 'Alex', email: 'alex@msn.com', age: 21, salary: 33000 },
  {
    id: 7,
    name: 'Vlad',
    email: 'vladimirborja013@example.com',
    age: 27,
    salary: 28000,
  },
];

app.get('/', (req, res) => {
  res.send(`
        This is the homepage. <br>
        Available routes: 
        <br> GET /api/users 
        <br> GET /api/users/:id
        <br> POST /api/users 
        <br> DELETE /api/users/:id
    `);
});

app.get('/api/users', (req, res) => {
  res.send(users);
});

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send('User not found');
  }
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  newUser.id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push(newUser);

  res.status(201).send(newUser);
});

app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.send(deletedUser);
  } else {
    res.status(404).send('User not found');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
