const express = require('express');
const _ = require('lodash');
const moment = require('moment');
const db = require('../db');

const { Rx } = db.models;

const router = express.Router();
/* add authentication */
router.post('/', async (req, res) => {
  let body = _.pick(req.body, ['mrn', 'phone', 'amount']);

  let charset ='';
  for (i = 0; i < 2; i++) {
    charset += String.fromCharCode(Math.floor((Math.random() * 25) + 97))
  }

  let numset = Math.floor(Math.random() * 1000);

  body.rxid = charset + numset;

  try {
    const rx = await Rx.create(body)
    return res.status(200).send({payload: 'success!'})
  } catch (e) {
    return res.status(400).send({error: e || 'Error creating a prescription'});
  }
});

router.get('/:phone', async (req, res) => {
  let { phone } = req.params;

  try {
    const rx = await Rx.findAll({
      where: {
        phone
      }
    });

    return res.status(200).send({payload: {
      rxid: rx[0].dataValues.rxid,
      amount: rx[0].dataValues.amount
    }});
  } catch (e) {
    console.log(e)
    return res.status(400).send({error: e || 'Error fetching prescription.'})
  }

})



module.exports = router;
