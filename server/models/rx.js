module.exports = (sequelize, Sequelize) => {
  var Rx = sequelize.define('Rx', {
    rxid: Sequelize.STRING,
    amount: Sequelize.NUMBER,
    mrn: Sequelize.NUMBER,
    phone: Sequelize.NUMBER,
    market: Sequelize.STRING,
    redeemDate: Sequelize.DATE,
    expiryDate: Sequelize.DATE
  })

  return Rx;
};
