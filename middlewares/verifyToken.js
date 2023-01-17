const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  // veryfy authentication

  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

//   console.log(authorization)

    // const token = req.headers.authorization;

    // ---> split the Bearer and get only the token
    const token = authorization.split(" ")[1];

//   console.log(token)
  if (!token) return res.status(400).send("No token sent");

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    if (!_id) return res.status(403).send("Invalid token");

    req.userId = _id
    // req.user = await User.findOne({ _id }).select("_id");
 
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorised" });
  }
};

module.exports = {verifyToken};


