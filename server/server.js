'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
var Sequelize = require('sequelize');
var db = require('./db');
var routes = require('./routes');

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use('/api', routes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));


let forceVal = (process.env.ENVIRONMENT === 'development') ? true : false;

db.sequelize.sync({force: forceVal}).then(()=>{
  app.listen(port, () => {
    console.log(`App server started at port ${port}`);
  });
});
