# SBA_318
******************************************************************************************************************************************************************************
Project Title: 
User Management with Express and RESTful API
Overview: 
This project is a user management web application built using Node.js and Express. The application allows users to sign up, log in, and access a personalized dashboard after successfully logging in. It demonstrates core concepts such as RESTful API design, middleware usage, templating with EJS, and interaction with server-side APIs via HTML forms.

The project includes a user authentication system, where user credentials are stored in a JSON file. Upon successful login, users are redirected to the main dashboard. The project also features custom middleware for time logging and neatly designed forms using CSS for signup and login.

Key Features:

*-User Signup and Login: Users can create an account by providing a username and password, and they can log in with those credentials.
*-RESTful API: The application provides a REST API to manage users, supporting CRUD operations such as creating new users, retrieving user details, updating, and deleting users.
*-Middleware: Custom middleware is used to add a timestamp to the response, showcasing your ability to create and use Express middleware.
*-Template Engine (EJS): The views are rendered using the EJS templating engine, enabling dynamic HTML generation for the login, signup, and dashboard pages.
Session-based User Redirection: After login, users are redirected to the dashboard page (index.ejs), which welcomes them.

Technologies Used:

*-Node.js: Backend runtime environment.
*-Express.js: Web framework for routing, middleware, and RESTful API handling.
*-EJS (Embedded JavaScript): Template engine for dynamic views.
*-CSS: Styling for the application, including form layouts.
*-JSON: Used for mock user data storage.

File Structure:

*-server.js: Initializes the server, sets up middleware, and routes.
*-api.js: Handles all REST API routes for managing users.
*-users.js: Manages the signup, login, and user redirection logic.
*-views/index.ejs: The main dashboard page displayed after user login.
*-users.json: A mock database for user credentials.

