const express = require('express');
const rx = require('./rx');
const app = express.Router();

app.use('/rx', rx);

module.exports = app;
