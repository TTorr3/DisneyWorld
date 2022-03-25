const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Character = sequelize.define(
  "Character",
  {
    img: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    history: DataTypes.TEXT,
  },
  {
    sequelize,
    freezeTableName: true,
  }
);

module.exports = Character;
