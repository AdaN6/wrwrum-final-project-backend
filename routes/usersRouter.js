const express = require('express');

const verifyToken = require("../middlewares/verifyToken")

const userRouter = express.Router();

const {
  getUsers,
  loginUser,
  signupUser,
  getUserEmail,
  updateUser,
} = require("../controllers/userControllers");

userRouter.route("/").get(getUsers);

userRouter
  .route("/auth")
  .post(verifyToken, getUserEmail)
  .put(verifyToken, updateUser)
  .delete();

//login
userRouter.route("/login")
.post(loginUser);


// signup
userRouter.route("/signup").post(signupUser);

module.exports = userRouter;



