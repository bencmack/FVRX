const express = require('express');
const _ = require('lodash');

const db = require('../db');
const { User } = db.models;

const router = express.Router();


const findUser = (req, res) => {
  res.send({ payload: req.user })
};

// const logout = async (req, res) => {
//   let { token } = req;
//
//   // db.Token.removeToken(token)
//   //   .then(() => res.sendStatus(204))
//   //   .catch(next)
//
//   try {
//     let removedToken = db.Token.removeToken(token);
//     res.sendStatus(204)
//   } catch (err) {
//     res.status(500).send({error: err.message || 'Error occurred while trying to logout'}).
//   };
// };


router.post('/', async (req, res) => {
  let body = _.pick(req.body, ['pinName', 'password']);

  try {
    let user = await User.create(body);
    return res.status(200).send({payload: user});
  } catch (e) {
    return res.status(400).send({error: e || 'Error occurred while creating the user.'});
  }
});


//logout [add auth]

// router.post('logout', logout);

module.exports = router;
