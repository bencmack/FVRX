const Sequelize = require('sequelize');
const sequelize = require('./sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

var User = sequelize.define('user', {
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
});

// modify JSON to not return password in JSON responses
// User.prototype.toJSON = function() {
//   var user = Object.assign({}, this.get());
//
//   delete user.password;
//   return user;
// }
//
// User.prototype.generateAuthToken = function() {
//   const access = 'auth';
//   const payload = {
//     id: this.id,
//     access: 'auth'
//   };
//
//   const token = jwt.sign(payload, process.env.JWT_SECRET);
//
//   return sequelize.models.token.create({
//     access,
//     token,
//     userId: this.id
//   })
// }

module.exports = User;
