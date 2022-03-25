const router = require("express").Router();
const { Movie, Genre } = require("../database/models/Association");

//Read
router.get("/movies", async (req, res) => {
  const movies = await Movie.findAll({
    attributes: ["img", "title", "date"],
  });
  if (movies.length === 0) {
    res.json("There arent any movie stored");
    return;
  }
  res.json(movies);
});

//Create
router.post("/movie", async (req, res) => {
  let movie = await Movie.findOne({
    where: { title: req.body.title },
  });

  if (movie) {
    res.json("Movie already created");
    return;
  }

  movie = await Movie.create({
    img: req.body.img,
    title: req.body.title,
    date: req.body.date,
    qualification: req.body.qualification,
  });

  let genre = await Genre.findOne({
    where: { name: req.body.genre },
  });

  if (!genre) {
    genre = await Genre.create({
      name: req.body.genre,
    });
  }

  genre.setMovie(movie);

  res.json(movie);
});

//Update
router.put("/movie/:title", async (req, res) => {
  const title = req.params.title;
  const movie = await Movie.findOne({
    where: { title: title },
  });

  if (!movie) {
    res.json("Movie not found");
    return;
  }

  await movie.update({
    date: req.body.date,
    qualification: req.body.qualification,
  });

  res.json(movie);
});

//Delete
router.delete("/movie/:title", async (req, res) => {
  const destroyed = await Movie.destroy({
    where: { title: req.params.title },
  });

  //If deleted a character destroy != 0 else destroy = 0
  if (destroyed) {
    res.json(`Movie ${req.params.title} deleted`);
  } else {
    res.json(`Movie ${req.params.title} not deleted because it wasn't found`);
  }
});

//Details of movie
router.get("/movie/:title", async (req, res) => {
  const title = req.params.title;

  const movie = await Movie.findOne({
    attributes: ["img", "title", "date", "qualification"],
    where: {
      title: title,
    },
  });

  if (!movie) {
    res.json("Movie not found");
    return;
  }

  res.json(movie);
});

module.exports = router;
