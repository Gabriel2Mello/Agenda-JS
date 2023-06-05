const express = require('express');
const route = express.Router();

const homeController = require('./src/Controllers/homeController');
const loginController = require('./src/Controllers/loginController');
const contactController = require('./src/Controllers/contactController');

const { loginRequired } = require('./src/Middlewares/middleware');

// Home Routes
route.get('/', homeController.index);

// Login Routes
route.get('/login', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);


// Contact Routes
route.get('/contact', loginRequired, contactController.index);
route.post('/contact/register', loginRequired, contactController.register);
route.get('/contact/:id', loginRequired, contactController.contact);
route.post('/contact/edit/:id', loginRequired, contactController.update);
route.get('/contact/delete/:id', loginRequired, contactController.delete);

module.exports = route;