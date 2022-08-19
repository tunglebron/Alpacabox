const jwt = require("jsonwebtoken");

var verify = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        res.unauth({ err : "Token is not valid!" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.unauth({ err : "You are not authenticated!" });
  }
}

module.exports = verify;
