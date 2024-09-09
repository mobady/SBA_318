const express = require('express')
const app = express()
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"));
// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Existing routes
const userRouter = require("./routes/users");
app.use("/users", userRouter);

// Add the new API routes
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);  // All API routes will be prefixed with /api

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});