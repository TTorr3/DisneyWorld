const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/db");
const verifyToken = require("./controller/jwt");

const app = express();

//Settings
app.set("PORT", process.env.PORT || 3000);

//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use(require("./routes/user"));
app.use(verifyToken);
app.use(require("./routes/movie"));
app.use(require("./routes/character"));

//Server listening
app.listen(app.get("PORT"), () => {
  console.log("Server listening at port ", app.get("PORT"));

  //Connect database
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Database connected succesfully");
    })
    .catch((err) => {
      console.log(err);
    });
});
