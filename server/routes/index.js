const express = require('express');
const rx = require('./rx');
const user = require('./user');
const app = express.Router();

app.use('/rx', rx);

app.use('/user', user);

module.exports = app;
