const router = require("express").Router();
const { Character } = require("../database/models/Association");

//Read
router.get("/characters", async (req, res) => {
  const characters = await Character.findAll({
    attributes: ["name", "age", "weight", "history"],
  });
  if (characters.length === 0) {
    res.json("There arent any character stored");
    return;
  }
  res.json(characters);
});

//Create
router.post("/character", async (req, res) => {
  const character = await Character.findOne({
    where: { name: req.body.name },
  });

  if (character) {
    res.json("Character already created");
    return;
  }

  const newCharacter = await Character.create({
    name: req.body.name,
    age: req.body.age,
    weight: req.body.weight,
    history: req.body.history,
  });

  res.json(newCharacter);
});

//Update
router.put("/character/:name", async (req, res) => {
  const name = req.params.name;

  const character = await Character.findOne({
    where: { name: name },
  });

  if (!character) {
    res.json("Character not found");
    return;
  }

  await character.update({
    age: req.body.age,
    weight: req.body.weight,
    history: req.body.history,
  });
  res.json(character);
});

//Delete
router.delete("/character/:name", async (req, res) => {
  const destroyed = await Character.destroy({
    where: { name: req.params.name },
  });
  //If deleted a character destroy != 0 else destroy = 0
  if (destroyed) {
    res.json(`Character ${req.params.name} deleted`);
  } else {
    res.json(
      `Character ${req.params.name} not deleted because it wasn't found`
    );
  }
});

//Details of character
router.get("/character/:name", async (req, res) => {
  const name = req.params.name;

  const character = await Character.findOne({
    attributes: ["img", "name", "age", "weight", "history"],
    where: {
      name: name,
    },
  });

  if (!character) {
    res.json("Character not found");
    return;
  }

  res.json(character);
});

module.exports = router;
