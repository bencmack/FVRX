module.exports = (sequelize, Sequelize) => {
  var Rx = sequelize.define('rx', {
    rxid: Sequelize.STRING,
    amount: Sequelize.FLOAT,
    mrn: Sequelize.INTEGER,
    phone: Sequelize.INTEGER,
    market: Sequelize.STRING,
    redeemDate: Sequelize.DATE,
    expiryDate: Sequelize.DATE
  })

  return Rx;
};
