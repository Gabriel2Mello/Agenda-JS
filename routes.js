const express = require('express');
const route = express.Router();
const homeController = require('./src/Controllers/homeController');
const contactController = require('./src/Controllers/contactController');

route.get('/', homeController.homePage);
route.post('/', homeController.GetPost);

// Contact routes
route.get('/contact', contactController.home);


module.exports = route;