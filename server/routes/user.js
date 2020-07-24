const express = require('express');
const _ = require('lodash');

const db = require('../db');
const { User } = db.models;

const router = express.Router();


// const findUser = (req, res) => {
//   res.send({ payload: req.user })
// };

// Create a user
router.post('/', async (req, res) => {
  let body = _.pick(req.body, ['pinName', 'password']);

  try {
    let user = await User.create(body);
    return res.status(200).send({payload: user});
  } catch (e) {
    return res.status(400).send({error: e || 'Error occurred while creating the user.'});
  }
});



module.exports = router;
