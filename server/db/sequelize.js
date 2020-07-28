const dbConfig = require('./db.config.js');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

// const sequelize = new Sequelize(
//   dbConfig.DB,
//   dbConfig.USER,
//   dbConfig.PASSWORD,{
//     host: dbConfig.HOST,
//     dialect: dbConfig.dialect,
//     operatorsAliases: false,
//     pool: {
//       max: dbConfig.pool.max,
//       min: dbConfig.pool.min,
//       acquire: dbConfig.pool.acquire,
//       idle: dbConfig.pool.idle
//     }
//   });


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: false,
    pool: {
      max: process.env.DB_POOL_MAX,
      min: process.env.DB_POOL_MIN,
      acquire: process.env.DB_POOL_ACQUIRE,
      idle: process.env.DB_POOL_IDLE
    }
  });

module.exports = sequelize;
