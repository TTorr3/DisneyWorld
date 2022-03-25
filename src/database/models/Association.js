const Character = require("./Character");
const Movie = require("./Movie");
const Genre = require("./Genre");

//One to one Movie - Genre
Genre.hasOne(Movie);
Movie.belongsTo(Genre);

//Many to Many Characters - Movies
Character.belongsToMany(Movie, { through: "CharacterMovie" });
Movie.belongsToMany(Character, { through: "CharacterMovie" });

module.exports = {
  Character,
  Movie,
  Genre,
};
