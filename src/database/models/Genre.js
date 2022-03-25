const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Genre = sequelize.define(
  "Genre",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
  }
);

module.exports = Genre;
