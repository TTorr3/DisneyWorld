//JWT Middleware
function verifyToken(req, res, next) {
  console.log(req.headers["authorization"]);
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.json("Invalid Token");
  }
}

module.exports = verifyToken;
