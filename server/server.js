'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var Sequelize = require('sequelize');
var models = require('./models');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

models.sequelize.sync().then(()=>{
  app.listen(port, () => {
    console.log(`App server started at port ${port}`);
  });
});
