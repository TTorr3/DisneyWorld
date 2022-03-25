const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Movie = sequelize.define(
  "Movie",
  {
    img: DataTypes.STRING,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: DataTypes.DATE,
    qualification: DataTypes.FLOAT,
  },
  {
    sequelize,
    freezeTableName: true,
  }
);

module.exports = Movie;
