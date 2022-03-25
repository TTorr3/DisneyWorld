const { Sequelize } = require('sequelize');
const { database } = require('../config');

const sequelize = new Sequelize({
    dialect: database.dialect,
    storage: database.storage
});

module.exports = sequelize;