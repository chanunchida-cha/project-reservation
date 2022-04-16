const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(401).send("token is require for authentication");
    }
  
    try {
      const decoded = jwt.verify(token, config.JWT_SECRET);
      req.partner = decoded;
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  };
  
  module.exports = verifyToken;