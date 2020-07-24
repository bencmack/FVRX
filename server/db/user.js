const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sequelize = require('./sequelize');
const Token = require('./token');

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
    toJSON: function() {
      var user = Object.assign({}, this.get());

      delete user.password;
      return user;
    },
    generateAuthToken: function() {
      const access = 'auth'
      const payload = {
        id: this.id,
        access: 'auth'
      }

      // come back to this, set env variable before app runs
      const token = jwt.sign(payload, process.ENV.JWT_SECRET);

      Token.create({
        access,
        token,
        userId: this.id
      })
    }
  },
  classMethods: {
    findByCredentials: function(password) {

      return this.find({where: { pinName: 'admin' }})
        .then((adminUser) => {
          if (!adminUser) {
            return Promise.reject({error: 'No username found'})
          }

          return bcrypt.compare(password, adminUser.password)
            .then((res) => {
              if (res) {
                return adminUser
              } else {
                return Promise.reject({error: 'Your credentials were incorrect.'})
              }
            })
        })
    }
    // findByToken: function(token) {
    //   return new Promise((resolve, reject) => {
    //     let id;
    //
    //     try {
    //       id = jwt.verify(token, process.ENV.JWT_SECRET).userId
    //     } catch (e) {
    //       const error = new Error('invalid token');
    //       error.status = 401
    //       return reject(error)
    //     }
    //
    //     this.findOne({where: id})
    //   })
    //
    // }
  }
});

User.hook('beforeCreate', user => {
  return bcrypt.genSalt(10)
    .then((salt) => bcrypt.hash(user.password, salt))
    .then((hash) => user.password = hash);
});




module.exports = User;
