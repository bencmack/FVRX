module.exports = (sequelize, Sequelize) => {
  var User = sequelize.define('user', {
    pin: Sequelize.STRING
  });

  return User;
}
