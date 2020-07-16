
const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const Rx = sequelize.define('rx', {
  rxid: Sequelize.STRING,
  amount: Sequelize.FLOAT,
  mrn: Sequelize.INTEGER,
  phone: Sequelize.STRING,
  market: Sequelize.STRING,
  redeemDate: Sequelize.DATE,
  expiryDate: Sequelize.DATE
});

module.exports = Rx;
