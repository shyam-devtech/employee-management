const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const key = "secretkey";

const verifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, key);

      /* Get user from the token-> here req.user is set..
        which can be used in next middleware functions
      */
      req.user = await Admin.findById(decoded.id).select("password");
      // console.log("req.user ",req.user);
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ message: "Not authorized" });
    }
  }

  if (!token) {
    res.status(401).send({ message: "No token provided!" });
  }
};
module.exports = { verifyToken };