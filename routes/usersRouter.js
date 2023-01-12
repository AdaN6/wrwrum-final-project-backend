const express = require('express');

const userRouter = express.Router();

const {
  getUsers,
  loginUser,
  signupUser,
  getUserEmail,
} = require("../controllers/userControllers");

userRouter.route("/")
.get(getUsers)

userRouter.route("/:email").get(getUserEmail).put().delete();

//login
userRouter.route("/login")
.post(loginUser);


// signup
userRouter.route("/signup").post(signupUser);

module.exports = userRouter;



