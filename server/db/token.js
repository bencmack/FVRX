const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const Token = sequelize.define('token', {
  access: {
    type: Sequelize.STRING,
    allowNull: false
  },
  token: {
    type: Sequelize.STRING,
    allowNull: false
  },
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  }
})

Token.removeToken = function(token) {
  return new Promise((resolve, reject) => {
    this.destroy({where: { token }})
      .then((res) => {
        resolve(res);
      })
      .catch((e) => reject({error: 'Token could not be removed'}))
  })
}

module.exports = Token;
