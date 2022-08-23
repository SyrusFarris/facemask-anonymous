const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our db
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: '0.0.0.0',
      dialect: 'mysql',
      port: 3001
    });

module.exports = sequelize;