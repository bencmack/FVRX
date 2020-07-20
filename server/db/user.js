const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = sequelize.define('user', {
  id:{
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  pinName: Sequelize.STRING,
  password: {
    type: Sequelize.STRING,
    allowNull: false
   }
},{
  instanceMethods: {
    toJSON: function () {
      var user = Object.assign({}, this.get());

      delete user.password;
      return user;
    }
  }
});

User.hook('beforeCreate', user => {
  return bcrypt.genSalt(10)
    .then((salt) => bcrypt.hash(user.password, salt))
    .then((hash) => user.password = hash);
});


module.exports = User;
