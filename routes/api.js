const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Path to the users JSON file (mock database)
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper function to read users from the JSON file
const getUsers = () => {
    const usersData = fs.readFileSync(usersFilePath);
    return JSON.parse(usersData);
};

// Helper function to write users to the JSON file
const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// GET /api/users - Retrieve all users
router.get('/users', (req, res) => {
    const users = getUsers();
    res.json(users);
});

// GET /api/users/:id - Retrieve a single user by ID
router.get('/users/:id', (req, res) => {
    const users = getUsers();
    const user = users.find((u) => u.id === parseInt(req.params.id));
    
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
});

// POST /api/users - Create a new user
router.post('/users', (req, res) => {
    const users = getUsers();
    const newUser = {
        id: users.length + 1,  // Simple ID assignment (incremental)
        username: req.body.username,
        password: req.body.password,
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json(newUser);  // 201: Resource created
});

// PUT /api/users/:id - Update a user by ID
router.put('/users/:id', (req, res) => {
    const users = getUsers();
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = { ...users[userIndex], ...req.body };  // Merge old and new data
    users[userIndex] = updatedUser;
    writeUsers(users);

    res.json(updatedUser);
});

// DELETE /api/users/:id - Delete a user by ID
router.delete('/users/:id', (req, res) => {
    const users = getUsers();
    const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    users.splice(userIndex, 1);  // Remove user from the array
    writeUsers(users);

    res.json({ message: 'User deleted successfully' });
});

module.exports = router;
