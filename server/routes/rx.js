const express = require('express');
const _ = require('lodash');
const moment = require('moment');
const db = require('../db');
const { Op } = require('sequelize');

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
    let rx = await Rx.create(body)
    return res.status(200).send({payload: 'success!'})
  } catch (e) {
    return res.status(400).send({error: e || 'Error creating a prescription'});
  }
});

router.get('/:phone', async (req, res) => {
  let { phone } = req.params;

  try {
    let [rx, metadata] = await db.sequelize.query(`
      SELECT * FROM rxes
      WHERE phone=${phone} AND (expiryDate >= NOW() OR expiryDate is NULL)
      ORDER BY createdAt DESC LIMIT 1
      `)
    if (!rx) {
      return res.status(404).send({error: 'No matching prescriptions'})
    }
    return res.status(200).send({payload: {
      rxid: rx.rxid,
      amount: rx.amount
    }});
  } catch (e) {
    console.log(e)
    return res.status(400).send({error: e || 'Error fetching prescription.'})
  }
});

router.patch('/:rxid', async (req, res) => {
  let { rxid } = req.params;
  let { market } = req.body;
  let redeemDate = moment();
  let expiryDate = moment().add(1, 'h');

  try {
    let [rx, metadata] = await db.sequelize.query(`
      UPDATE rxes
      SET redeemDate = NOW(),
          expiryDate = NOW + INTERVAL 1 HOUR,
          market = ${market}
      WHERE rxid = ${rxid}
      `)

    console.log('This is rx \n\n', rx);

    let [updatedRxes ,meta] = await db.sequelize.query(`
      UPDATE rxes
      SET expiryDate = NOW()
      WHERE phone = ${rx.phone} AND rxid <> ${rxid} AND expiryDate is NULL
      `)

    console.log('This is updatedRxes \n\n',updatedRxes);

    return res.status(200).send({payload: {rx}})
  } catch (e) {
    return res.status(400).send({error: e || 'Error updating prescription.'})
  }
})



module.exports = router;
