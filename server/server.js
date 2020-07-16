'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var Sequelize = require('sequelize');
var db = require('./db');
var routes = require('./routes');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', routes);

// remove force:true
db.sequelize.sync({force: true}).then(()=>{
  app.listen(port, () => {
    console.log(`App server started at port ${port}`);
  });
});
