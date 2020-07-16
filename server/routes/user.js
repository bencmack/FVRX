const express = require('express');
const app = express.Router();
const _ = require('lodash');

const db = require('../models');

const findUser = (req, res) => {
  res.send({ payload: req.user })
};

const logout = async (req, res) => {
  let { token } = req;

  // db.Token.removeToken(token)
  //   .then(() => res.sendStatus(204))
  //   .catch(next)

  try {
    let removedToken = db.Token.removeToken(token);
    res.sendStatus(204)
  } catch (err) {
    res.status(500).send({error: err.message || 'Error occurred while trying to logout'}).
  };
};

const createUser = async (req, res) => {
  let body = _.pick(req.body, ['rx', 'password']);
  try {
    let newUser = await db.User.create(body);
    res.send(newUser);
  } catch (err) {
    res.status(500).send({error: err.message || 'Error occurred while creating the User.'})
  };
};

//logout [add auth]

app.post('logout', logout);

module.exports = app;
