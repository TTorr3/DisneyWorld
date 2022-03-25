const router = require("express").Router();
const jwt = require("jsonwebtoken");

const User = require("../database/models/User");
const { key } = require("../config");

router.post("/auth/login", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
  });

  if (user) {
    jwt.sign({ user }, key, (err, token) => {
      res.json({
        Status: "Usuario login succesfully",
        Token: token,
      });
      return;
    });
  }

  res.json("User not found");
});

router.post("/auth/register", async (req, res) => {
  let user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (user) {
    res.json("User already created");
  }

  user = await User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  jwt.sign({ user }, key, (err, token) => {
    res.json({
      Status: "User created succesfully",
      Token: token,
    });
  });
});

module.exports = router;
