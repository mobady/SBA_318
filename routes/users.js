const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const getTimeComponent = () => {
    return `TIME 🕛 : ${new Date().toUTCString()}`
};
router.use((req, res, next) => {
    // Store the time component in res.locals
    res.locals.timeComponent = getTimeComponent();
    next(); // Proceed to the next middleware or route handler
});

// Path to the users JSON file
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper function to read users from the JSON file
const getUsers = () => {
    const usersData = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(usersData);
};

// Helper function to write users to the JSON file
const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Serve the signup page
router.get('/signup', (req, res) => {
    res.render('signup', { timeComponent: res.locals.timeComponent }); // Render signup.ejs view
});

// Handle signup form submission
router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Get existing users
    const users = getUsers();

    // Check if the username already exists
    const userExists = users.find((user) => user.username === username);

    if (userExists) {
        return res.status(400).send('Username already exists. Please choose another one.');
    }

    // Create a new user object
    const newUser = {
        id: users.length + 1, 
        username,
        password,  
    };

    // Add the new user to the users array
    users.push(newUser);

    // Write the updated users array to the user.json file
    writeUsers(users);

    // Redirect to the login page after successful signup
    res.redirect('/users/login');
});

// Serve the login page
router.get('/login', (req, res) => {
    res.render('login', { timeComponent: res.locals.timeComponent }); 
});

// Handle login form submission
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Get existing users
    const users = getUsers();

    // Check if the username and password match any record
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
        // User authenticated successfully
        res.redirect('/users/index');
    } else {
        // Authentication failed
        res.status(401).send('Invalid username or password. Please try again.');
    }
});
// Serve the index page after login
router.get('/index', (req, res) => {
    res.render('index', { timeComponent: res.locals.timeComponent });
});


module.exports = router;
